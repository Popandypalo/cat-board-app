import { useCallback, useMemo } from 'react';

import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from '@dnd-kit/core';

import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { useUnit } from "effector-react";

import { Card } from "@/entities/card/ui/card";
import { GridCell } from "./grid-cell";
import { $activeDndItemId, $cards } from "@/entities/card/model";
import { dragEnded, dragStarted } from "../model";
import { cardMoved } from "@/features/move-card/model";

import cls from './grid.module.scss';


export const Grid = () => {
  const [cards, activeId] = useUnit([$cards, $activeDndItemId]);
  
  const activeCard = useMemo(() => 
    cards.find(card => card.id === activeId),
    [cards, activeId]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleDragStart = useCallback(({ active }: { active: { id: UniqueIdentifier } }) => {
    dragStarted(active.id.toString());
  }, []);
  
  const handleDragEnd = useCallback(({ active, over }: { 
    active: { id: UniqueIdentifier }, 
    over: { id: UniqueIdentifier } | null 
  }) => {
    dragEnded();
    if (over && active.id !== over.id) {
      cardMoved({ 
        activeId: active.id.toString(), 
        overId: over.id.toString() 
      });
    }
  }, []);

  const sortableItems = useMemo(() => cards.map(card => card.id), [cards]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sortableItems}>
        <div className={cls.grid}>
          {cards.map(card => (
            <GridCell key={card.id} id={card.id}>
              <Card
                id={card.id}
                description={card.description}
                imageUrl={card.imageUrl}
                isDragging={activeId === card.id}
              />
            </GridCell>
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeCard && <Card {...activeCard} />}
      </DragOverlay>
    </DndContext>
  );
};