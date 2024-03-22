import React, { forwardRef, HTMLProps } from 'react';

import { classes } from '../utils/classes';

import './Tag.scss';

type Props = {
  className?: string;
  color?: string;
  value: any;
};

const Tag = forwardRef<HTMLSpanElement, HTMLProps<HTMLSpanElement> & Props>(
  ({ className, color, value, ...props }, ref) => (
    <span ref={ref} className={classes('tag', color && `tag--${color}`, className)} {...props}>
      {value}
    </span>
  )
);

export default Tag;
