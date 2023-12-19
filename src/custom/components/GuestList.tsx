import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import * as Tooltip from '@radix-ui/react-tooltip';
import {
  CellEditingStoppedEvent,
  ColDef,
  GetRowIdParams,
  GridApi,
  ICellRendererParams,
  RowClassParams,
  RowDragEndEvent,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Pill } from 'payload/components';
import { Meta, useConfig } from 'payload/components/utilities';
import { getTranslation } from 'payload/dist/utilities/getTranslation';
import { stringify } from 'qs';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import DeleteMany from './DeleteMany';
import EditMany from './EditMany';
import Icon from './Icon';
import SelectEditor from './SelectEditor';
import Tag from './Tag';
import TextareaEditor from './TextareaEditor';
import { Guest, Party } from '../../payload-types';
import { PayloadFormOnSuccess, PayloadGetApi, PayloadPostApi } from '../types/api';

import 'ag-grid-community/styles/ag-grid-no-native-widgets.css';
import './GuestList.scss';

interface AddRowRendererParams extends ICellRendererParams<Guest, any> {
  onClick: (index: number) => void | Promise<void>;
}

const AddRowRenderer: React.FC<AddRowRendererParams> = memo(({ node: { rowIndex }, onClick }) => {
  const onClickInternal = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const index = e.altKey ? rowIndex : rowIndex + 1;

      await onClick(index);
    },
    [rowIndex]
  );

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger onClick={onClickInternal} className="button--icon">
          <Icon name="add" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" sideOffset={4} className="tooltip--content">
            <div>
              Click <span className="text--low-contrast">to add below</span>
            </div>
            <div>
              Option-click <span className="text--low-contrast">to add above</span>
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
});

const GuestList: React.FC = (props: any) => {
  const {
    collection,
    collection: { fields, slug },
    data: { docs, totalDocs },
  } = props;

  // Refs
  const gridRef = useRef<AgGridReact<Guest>>(null);

  // State
  const [error, setError] = useState<string | null>(null);
  const [rowData, setRowData] = useState<Guest[]>([]);
  const [selectedRows, setSelectedRows] = useState<Guest[]>([]);

  // Hooks
  const {
    serverURL,
    routes: { api },
  } = useConfig();
  const { t, i18n } = useTranslation('general');

  // Callbacks
  const addGuest = useCallback(
    async (addIndex = -1) => {
      try {
        const res = await fetch(`${serverURL}${api}/${slug}`, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            sort: addIndex,
          }),
        });

        if (res.status !== 200) {
          setError(res.statusText);

          return;
        }

        const data: PayloadPostApi<Guest> = await res.json();

        gridRef.current.api.applyTransaction({
          add: [data.doc],
          addIndex,
        });

        await reorderDocs(gridRef.current.api);

        gridRef.current.api.ensureIndexVisible(gridRef.current.api.getRowNode(data.doc.id).rowIndex);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    },
    [api, gridRef, serverURL, slug]
  );

  const fetchDocs = useCallback(
    async (limit = 10) => {
      try {
        const res = await fetch(`${serverURL}${api}/${slug}?limit=${limit}`, {
          credentials: 'include',
        });

        if (res.status !== 200) {
          setError(res.statusText);

          return;
        }

        const data: PayloadGetApi<Guest> = await res.json();

        setRowData([...data.docs]);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    },
    [api, serverURL, slug]
  );

  const getRowId = useCallback((params: GetRowIdParams<Guest>) => params.data.id, []);

  const getRsvpColumnDefs = useCallback(
    (fieldName: string): Partial<ColDef<Guest>> => ({
      cellRenderer: (params: ICellRendererParams<Guest, any>) =>
        params.value ? (
          <Tag
            value={params.value === 'accept' ? 'Accepted' : 'Declined'}
            color={params.value === 'accept' ? 'green' : 'red'}
          />
        ) : null,
      cellEditor: SelectEditor,
      cellEditorPopup: true,
      cellEditorPopupPosition: 'over',
      cellEditorParams: {
        getLabel: (v: any) => v.label,
        getValue: (v: any) => v.value,
        isClearable: fields.find((f: any) => f.name === fieldName)?.admin.isClearable ?? false,
        options: fields.find((f: any) => f.name === fieldName)?.options ?? [],
      },
    }),
    [fields]
  );

  const getTagsColumnDefs = useCallback(
    (collection: string): Partial<ColDef<Guest>> => ({
      cellRenderer: (params: ICellRendererParams<Guest, Party>) =>
        params.value?.value ? <Tag value={params.value?.value} color={params.value?.color} /> : null,
      cellEditor: SelectEditor,
      cellEditorPopup: true,
      cellEditorPopupPosition: 'over',
      cellEditorParams: {
        collection: collection,
        getLabel: (v: Party) => v.value,
        getValue: (v: Party) => v.id,
        isClearable: true,
      },
    }),
    []
  );

  const onCellEditingStopped = useCallback(
    async (params: CellEditingStoppedEvent<Guest>) => {
      if (!params.valueChanged) {
        return;
      }

      try {
        const field: keyof Guest = params.colDef.field as keyof Guest;
        const value = params.newValue?.id ?? params.newValue?.value ?? params.newValue ?? null;

        const res = await fetch(`${serverURL}${api}/${slug}/${params.data.id}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            [field]: value,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();

          gridRef.current.api.applyTransaction({
            update: [data.doc],
          });
        } else {
          const json = await res.json();

          console.error(json);
          setError(json.errors[0].message);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    },
    [api, serverURL, slug]
  );

  const onDeleteMany = useCallback(() => {
    gridRef.current.api.applyTransaction({
      remove: selectedRows,
    });
  }, [gridRef, selectedRows]);

  const onEditMany = useCallback(
    (json: PayloadFormOnSuccess<Guest>) => {
      gridRef.current.api.deselectAll();
      gridRef.current.api.applyTransaction({
        update: json.docs,
      });
    },
    [gridRef]
  );

  const onRowDragEnd = useCallback(async (e: RowDragEndEvent<Guest>) => await reorderDocs(e.api), []);

  const onSelectionChanged = useCallback(() => {
    const rows = gridRef.current.api.getSelectedRows() ?? [];

    setSelectedRows([...rows]);
  }, [gridRef]);

  const reorderDocs = useCallback(
    async (gridApi: GridApi<Guest>) => {
      const docs: Guest[] = [];

      gridApi.forEachNode((node) => {
        docs.push(node.data);
      });

      try {
        const res = await fetch(`${serverURL}${api}/${slug}/reorder`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            docs,
          }),
        });

        if (res.status !== 200) {
          console.error(res);
          setError(res.statusText);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    },
    [api, serverURL, slug]
  );

  const stringifySelectedDocsQuery = useCallback(
    () =>
      stringify({
        where: {
          id: {
            in: selectedRows.map((g) => g.id),
          },
        },
      }),
    [selectedRows]
  );

  // Memoized
  const columnDefs: ColDef<Guest>[] = useMemo(
    () => [
      {
        cellClass: 'ag-cell--no-hover',
        editable: false,
        minWidth: 31,
        pinned: 'left',
        resizable: false,
        rowDrag: true,
        singleClickEdit: false,
        width: 31,
      },
      {
        cellClass: 'ag-cell--no-padding ag-cell--no-hover',
        editable: false,
        minWidth: 26,
        pinned: 'left',
        resizable: false,
        singleClickEdit: false,
        width: 26,
        cellRenderer: (params: ICellRendererParams<Guest, any>) => <AddRowRenderer {...params} onClick={addGuest} />,
      },
      {
        cellClass: 'ag-cell--checkbox ag-cell--no-hover',
        checkboxSelection: true,
        editable: false,
        headerCheckboxSelection: true,
        headerClass: 'ag-header-cell--checkbox',
        minWidth: 32,
        pinned: 'left',
        resizable: false,
        singleClickEdit: false,
        width: 32,
      },
      {
        field: 'first',
        initialWidth: 125,
        pinned: 'left',
        singleClickEdit: false,
        cellRenderer: (params: ICellRendererParams<Guest, string>) => (
          <Link to={`/admin/collections/guests/${params.data.id}`}>{params.value ?? '<No First Name>'}</Link>
        ),
      },
      {
        field: 'last',
        initialWidth: 150,
      },
      {
        field: 'middle',
        initialWidth: 120,
      },
      {
        field: 'party',
        initialWidth: 175,
        ...getTagsColumnDefs('parties'),
      },
      {
        field: 'address',
        cellEditor: TextareaEditor,
        cellEditorPopup: true,
        cellEditorPopupPosition: 'over',
        initialWidth: 175,
        suppressKeyboardEvent: ({ editing, event }) => editing && event.shiftKey && event.key === 'Enter',
      },
      {
        field: 'side',
        initialWidth: 75,
        minWidth: 75,
        ...getTagsColumnDefs('sides'),
      },
      {
        field: 'relation',
        initialWidth: 150,
        ...getTagsColumnDefs('relations'),
      },
      {
        field: 'rsvpWelcomeParty',
        headerName: 'RSVP Welcome Party',
        ...getRsvpColumnDefs('rsvpWelcomeParty'),
      },
      {
        field: 'rsvpRehearsalDinner',
        headerName: 'RSVP Rehearsal Dinner',
        ...getRsvpColumnDefs('rsvpRehearsalDinner'),
      },
      {
        field: 'rsvpWeddingDay',
        headerName: 'RSVP Wedding Day',
        ...getRsvpColumnDefs('rsvpWeddingDay'),
      },
      {
        field: 'rsvpPoolDay',
        headerName: 'RSVP Pool Day',
        ...getRsvpColumnDefs('rsvpPoolDay'),
      },
      {
        field: 'phone',
        initialWidth: 150,
      },
      {
        field: 'email',
      },
    ],
    [addGuest, getRsvpColumnDefs, getTagsColumnDefs]
  );

  const defaultColDef: ColDef<Guest> = useMemo(
    () => ({
      editable: true,
      minWidth: 120,
      resizable: true,
      singleClickEdit: true,
    }),
    []
  );

  const icons = useMemo(
    () => ({
      columnMoveMove:
        '<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor" class="text--low-contrast"><path d="M480-81.413 304.348-257.065 363-315.717l75.5 75.499V-438.5H240.218l75.499 75.5-58.652 58.652L81.413-480l175.652-175.652L315.717-597l-75.499 75.5H438.5v-198.282L363-644.283l-58.652-58.652L480-878.587l175.652 175.652L597-644.283l-75.5-75.499V-521.5h198.282L644.283-597l58.652-58.652L878.587-480 702.935-304.348 644.283-363l75.499-75.5H521.5v198.282l75.5-75.499 58.652 58.652L480-81.413Z"/></svg>',
      rowDrag:
        '<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor" class="text--low-contrast"><path d="M349.911-160Q321-160 300.5-180.589q-20.5-20.588-20.5-49.5Q280-259 300.589-279.5q20.588-20.5 49.5-20.5Q379-300 399.5-279.411q20.5 20.588 20.5 49.5Q420-201 399.411-180.5q-20.588 20.5-49.5 20.5Zm260 0Q581-160 560.5-180.589q-20.5-20.588-20.5-49.5Q540-259 560.589-279.5q20.588-20.5 49.5-20.5Q639-300 659.5-279.411q20.5 20.588 20.5 49.5Q680-201 659.411-180.5q-20.588 20.5-49.5 20.5Zm-260-250Q321-410 300.5-430.589q-20.5-20.588-20.5-49.5Q280-509 300.589-529.5q20.588-20.5 49.5-20.5Q379-550 399.5-529.411q20.5 20.588 20.5 49.5Q420-451 399.411-430.5q-20.588 20.5-49.5 20.5Zm260 0Q581-410 560.5-430.589q-20.5-20.588-20.5-49.5Q540-509 560.589-529.5q20.588-20.5 49.5-20.5Q639-550 659.5-529.411q20.5 20.588 20.5 49.5Q680-451 659.411-430.5q-20.588 20.5-49.5 20.5Zm-260-250Q321-660 300.5-680.589q-20.5-20.588-20.5-49.5Q280-759 300.589-779.5q20.588-20.5 49.5-20.5Q379-800 399.5-779.411q20.5 20.588 20.5 49.5Q420-701 399.411-680.5q-20.588 20.5-49.5 20.5Zm260 0Q581-660 560.5-680.589q-20.5-20.588-20.5-49.5Q540-759 560.589-779.5q20.588-20.5 49.5-20.5Q639-800 659.5-779.411q20.5 20.588 20.5 49.5Q680-701 659.411-680.5q-20.588 20.5-49.5 20.5Z"/></svg>',
    }),
    []
  );

  const rowClassRules = useMemo(
    () => ({
      'green--background': (params: RowClassParams) => params.data.party?.color === 'green',
      'teal--background': (params: RowClassParams) => params.data.party?.color === 'teal',
      'cyan--background': (params: RowClassParams) => params.data.party?.color === 'cyan',
      'blue--background': (params: RowClassParams) => params.data.party?.color === 'blue',
      'violet--background': (params: RowClassParams) => params.data.party?.color === 'violet',
      'purple--background': (params: RowClassParams) => params.data.party?.color === 'purple',
      'plum--background': (params: RowClassParams) => params.data.party?.color === 'plum',
      'pink--background': (params: RowClassParams) => params.data.party?.color === 'pink',
      'red--background': (params: RowClassParams) => params.data.party?.color === 'red',
      'orange--background': (params: RowClassParams) => params.data.party?.color === 'orange',
      'border-bottom--none': (params: RowClassParams) => {
        const rowParty = params.data.party?.id ?? null;
        const rows = [];

        params.api.forEachNode((node) => rows.push(node));

        const nextRowParty = rows[(params?.node?.rowIndex ?? 0) + 1]?.data.party?.id ?? null;

        return rowParty && nextRowParty && rowParty === nextRowParty;
      },
    }),
    []
  );

  // Effects
  useEffect(() => {
    if (docs) {
      fetchDocs(totalDocs);
    }
  }, [docs, totalDocs, fetchDocs]);

  return (
    <div className="default-page-template">
      <Meta title={getTranslation(collection.labels.plural, i18n)} />
      <div className="gutter--left gutter--right collection-list__wrap component">
        <div className="row">
          <h1>{getTranslation(collection.labels.plural, i18n)}</h1>
          <Pill onClick={async () => await addGuest()} className="pill margin--bottom">
            {t('createNew')}
          </Pill>
          <div className="flex--grow" />
          {selectedRows.length > 0 && (
            <div className="row row--selection">
              <span className="selected-text margin--bottom">
                {selectedRows.length} {getTranslation(collection.labels.plural, i18n)} selected
              </span>
              <EditMany
                count={selectedRows.length}
                queryParams={stringifySelectedDocsQuery()}
                collection={collection}
                onSuccess={onEditMany}
              />
              <DeleteMany
                count={selectedRows.length}
                collection={collection}
                onDelete={onDeleteMany}
                queryParams={stringifySelectedDocsQuery()}
              />
            </div>
          )}
        </div>
        {error && <p>{error}</p>}
        <AgGridReact
          ref={gridRef}
          animateRows={true}
          className="guest-data-grid"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowId={getRowId}
          headerHeight={32}
          icons={icons}
          onCellEditingStopped={onCellEditingStopped}
          onRowDragEnd={onRowDragEnd}
          onSelectionChanged={onSelectionChanged}
          rowClassRules={rowClassRules}
          rowData={rowData}
          rowDragManaged={true}
          rowDragMultiRow={true}
          rowHeight={36}
          rowSelection={'multiple'}
          stopEditingWhenCellsLoseFocus={true}
          suppressColumnVirtualisation={true}
          suppressRowClickSelection={true}
        />
      </div>
    </div>
  );
};

export default GuestList;
