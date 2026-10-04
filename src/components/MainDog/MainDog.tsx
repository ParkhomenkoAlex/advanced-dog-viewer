import type { Dog } from '../../types/dog';
import { formatBreed } from '../../utils/formatBreed';
import styles from './MainDog.module.css';

interface MainDogProps {
  dog: Dog;
  isFavorite: boolean;
  onAddToFavorites: (dog: Dog) => void;
}

function MainDog({ dog, isFavorite, onAddToFavorites }: MainDogProps) {
  return (
    <section className={styles.mainDog}>
      <img src={dog.imageUrl} alt={formatBreed(dog.breed)} />

      <div className={styles.info}>
        <h2>{formatBreed(dog.breed)}</h2>

        <button
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.favorite : ''
          }`}
          type="button"
          aria-label={isFavorite ? 'Already in favorites' : 'Add to favorites'}
          title={isFavorite ? 'Already in favorites' : 'Add to favorites'}
          disabled={isFavorite}
          onClick={() => onAddToFavorites(dog)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.31l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5z" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default MainDog;
