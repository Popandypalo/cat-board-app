
import cls from './add-card.module.scss';
import { cardAdded, fetchCatImageFx } from '../model';
import { useUnit } from 'effector-react';

export const AddCard = () => {
  const loading = useUnit(fetchCatImageFx.pending); 

  return (
    <button
      className={`${cls['add-button']} ${loading ? cls.loading : ''}`}
      onClick={()=>cardAdded()}
      disabled={loading}
    >
      <span className={cls.cat}>
        {loading ? '😻' : '🐱'}
      </span>
    </button>
  );
};