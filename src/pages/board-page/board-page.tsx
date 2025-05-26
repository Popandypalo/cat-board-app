import { Board } from "@/widgets/board/ui/board";
import { AddCard } from "@/features/add-card/ui/add-card";
import cls from "./board-page.module.scss";

const BoardPage = () => {
  return (
    <div className={cls["board-page"]}>
      <Board />
      <AddCard />
    </div>
  );
};

export default BoardPage;