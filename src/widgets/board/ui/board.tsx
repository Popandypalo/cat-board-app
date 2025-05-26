import { useUnit } from "effector-react";
import { $cards } from "@/entities/card/models";
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
          
          <h2 className={cls['board__empty-message']}>
            Ой, тут пусто!<br />Добавь первую карточку с котиком
          </h2>
        </div>
      )}
    </div>
  );
};