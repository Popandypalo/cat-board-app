
import type { MouseEvent } from "react";

import cls from "./add-like.module.scss";
import Heart from "@/shared/assets/icons/heart";

interface IAddLikeProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => {},
    isLiked: boolean,
}

const AddLike = ({onClick, isLiked = false} : IAddLikeProps) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(isLiked);
        onClick(e);
    };

    return (
        <button 
            className={`${cls['add-like']} ${isLiked ? cls['add-like_active'] : ''}`}
            onClick={(e)=>handleClick(e)}
            onPointerDown={(e) => e.stopPropagation()}
        >
            <Heart className={cls[`add-like__heart`]} fill={`${isLiked ? 'red' : 'none'}`} color={`${isLiked ? '#ff0000' : '#000000'}`}/>
        </button>
    ); 
}
export default AddLike;