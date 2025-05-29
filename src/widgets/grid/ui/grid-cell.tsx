import React from "react";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';

import cls from './grid-cell.module.scss';

interface GridCellProps {
  id?: string;
  width?: number;
  height?: number;

  children: (props: { 
    attributes: object; 
    listeners: object 
  }) => React.ReactNode;
}

export const GridCell = React.memo(({ 
  id = uuidv4(), 
  children, 
  width = 2, 
  height = 2 
}: GridCellProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridColumnEnd: `span ${width}`,
    gridRowEnd: `span ${height}`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cls['grid-cell']}
    >
      {children}
    </div>
  );
});

GridCell.displayName = 'GridCell';