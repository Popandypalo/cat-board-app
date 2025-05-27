import BoardPage from "@/pages/board-page/board-page";
import cls from "./app.module.scss";

const App = () => {
    return (
        <div className={cls.app}>
            <div className={cls['app__emoji-container']}>
                {[...Array(50)].map((_, i) => (
                    <div key={i} className={cls.app__emoji}>🐱</div>
                ))}
            </div>
            
            <div className={cls['app_content']}>
                <BoardPage/>
            </div>
        </div>
    );
}

export default App;