import cls from './delete-card.module.scss';

interface DeleteCardProps {
  onClick: () => void;
}

export const DeleteCard = ({ onClick }: DeleteCardProps) => {
  return (
    <button 
      className={cls.deleteCard}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <span className={cls.deleteCard__icon}>×</span>
    </button>
  );
};