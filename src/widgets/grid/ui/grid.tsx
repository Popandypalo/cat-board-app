import { useCallback, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
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
import { cardDeleted } from '@/features/delete-card/model';

export const Grid = () => {
  const [cards, activeId] = useUnit([$cards, $activeDndItemId]);
  
  const activeCard = useMemo(() => 
    cards.find(card => card.id === activeId),
    [cards, activeId]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = useCallback(({ active }: { active: { id: UniqueIdentifier } }) => {
    dragStarted(active.id.toString());
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    dragEnded();

    if (over?.data.current?.isDropZone) {
      cardDeleted({ id: active.id.toString() });
      return;
    }

    console.log(over?.id);
    console.log(active.id);
    console.log("over.data:", over?.data.current);
    console.log(over?.data.current?.isDropZone);
    if (over && active.id !== over.id) {
      cardMoved({ 
        activeId: active.id.toString(), 
        overId: over.id.toString() 
      });
    }
  }, []);

  const sortableItems = useMemo(() => cards.map(card => card.id), [cards]);

  const { setNodeRef: setLeftDropZoneRef } = useDroppable({
    id: 'left-dropzone',
    data: {
      isDropZone: true,
      type: ['dropzone']
    },
  });

  const { setNodeRef: setRightDropZoneRef } = useDroppable({
    id: 'right-dropzone',
    data: {
      isDropZone: true,
      type: ['dropzone']
    },
  });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div 
        className={`${cls.dropZone} ${cls.leftDropZone}`} 
        ref={setLeftDropZoneRef}
      />
      
      <SortableContext items={sortableItems}>
        <div className={cls.grid}>
          {cards.map(card => (
            <GridCell id={card.id} key={card.id}>
              <Card
                id={card.id}
                description={card.description}
                imageUrl={card.imageUrl}
                isDragging={activeId === card.id} 
                isLiked={card.isLiked}
              />
            </GridCell>
          ))}
        </div>
      </SortableContext>

      <div 
        className={`${cls.dropZone} ${cls.rightDropZone}`} 
        ref={setRightDropZoneRef}
      />

      <DragOverlay>
        {activeCard && <Card {...activeCard} />}
      </DragOverlay>
    </DndContext>
  );
};