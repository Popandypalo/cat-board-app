import { useUnit } from "effector-react";
import { $cards } from "@/entities/card/model";
import { Grid } from "@/widgets/grid";
import cls from "./board.module.scss";

export const Board = () => {
  const cards = useUnit($cards);
  
  return (
    <div className={cls.board}>
      {cards.length > 0 ? (
        <Grid />
      ) : (
        <div className={cls['board__empty-state']}>
          <span className={cls['board__empty-icon']}>😿</span>
          
          <span className={cls['board__empty-message']}>
            Ой, тут пусто!<br />Добавь свои первые карточки с котиками
          </span>
        </div>
      )}
    </div>
  );
};