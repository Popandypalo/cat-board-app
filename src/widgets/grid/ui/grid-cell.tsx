import React from "react";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import cls from './grid-cell.module.scss';

interface GridCellProps {
  id: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
}

export const GridCell = React.memo(({ 
  id, 
  children, 
  width = 1, 
  height = 1 
}: GridCellProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-delete-button]')) {
      return;
    }
    listeners?.onPointerDown?.(e);
  };

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
      onPointerDown={handlePointerDown}
      className={cls['grid-cell']}
    >
      {children}
    </div>
  );
});

GridCell.displayName = 'GridCell';