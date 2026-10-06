import type { IDog } from '../../interfaces/dog';
import { formatBreed } from '../../utils/formatBreed';
import styles from './MainDog.module.css';

interface IMainDogProps {
    dog: IDog;
    isFavorite: boolean;
    onToggleFavorite: (dog: IDog) => void;
    onPreviousDog: () => void;
    onNextDog: () => void;
    isPreviousDogDisabled: boolean;
    isNextDogDisabled: boolean;
}

function MainDog({
    dog,
    isFavorite,
    onToggleFavorite,
    onPreviousDog,
    onNextDog,
    isPreviousDogDisabled,
    isNextDogDisabled,
}: IMainDogProps) {
    return (
        <section className={styles.mainDog}>
            <img src={dog.imageUrl} alt={formatBreed(dog.breed)} />

            <div className={styles.info}>
                <h2>{formatBreed(dog.breed)}</h2>

                <div className={styles.controls}>
                    <button
                        className={styles.navigationButton}
                        type="button"
                        aria-label="Previous dog"
                        title="Previous dog"
                        disabled={isPreviousDogDisabled}
                        onClick={onPreviousDog}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m14.5 5-7 7 7 7" />
                        </svg>
                    </button>

                    <button
                        className={`${styles.favoriteButton} ${
                            isFavorite ? styles.favorite : ''
                        }`}
                        type="button"
                        aria-label={
                            isFavorite
                                ? 'Remove from favorites'
                                : 'Add to favorites'
                        }
                        title={
                            isFavorite
                                ? 'Remove from favorites'
                                : 'Add to favorites'
                        }
                        aria-pressed={isFavorite}
                        onClick={() => onToggleFavorite(dog)}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.31l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5z" />
                        </svg>
                    </button>

                    <button
                        className={styles.navigationButton}
                        type="button"
                        aria-label="Next dog"
                        title="Next dog"
                        disabled={isNextDogDisabled}
                        onClick={onNextDog}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m9.5 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default MainDog;
