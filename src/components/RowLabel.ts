export default function RowLabel(field: string, fallback: string) {
  return ({ data, index }: any) => data?.[field] || `${fallback} ${String(index).padStart(2, '0')}`;
}
