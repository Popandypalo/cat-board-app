
import BoardPage from "@/pages/board-page/board-page";

import cls from "./App.module.scss";

const App = () => {
    return(
        <div className={cls.app}>
            {[...Array(50)].map((_, i) => (
                    <div key={i} className={cls["app__emoji"]}>🐱</div>
            ))}
            <BoardPage/>
        </div>
    );
}

export default App;