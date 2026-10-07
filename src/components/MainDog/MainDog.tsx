import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
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
    const breedName = formatBreed(dog.breed);
    const favoriteLabel = isFavorite
        ? 'Remove from favorites'
        : 'Add to favorites';

    return (
        <section
            className={styles.mainDog}
            aria-label={`Featured ${breedName}`}
        >
            <div className={styles.imageFrame}>
                <AnimatePresence initial={false} mode="wait">
                    <motion.img
                        key={dog.imageUrl}
                        className={styles.image}
                        src={dog.imageUrl}
                        alt={breedName}
                        initial={{ opacity: 0, scale: 1.025 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.34, ease: 'easeOut' }}
                    />
                </AnimatePresence>

                <div className={styles.scrim} aria-hidden="true" />

                <div className={styles.content}>
                    <p className={styles.eyebrow}>Current dog</p>
                    <h2>{breedName}</h2>

                    <div className={styles.controls}>
                        <button
                            className={`${styles.favoriteButton} ${
                                isFavorite ? styles.favorite : ''
                            }`}
                            type="button"
                            aria-label={favoriteLabel}
                            title={favoriteLabel}
                            aria-pressed={isFavorite}
                            onClick={() => onToggleFavorite(dog)}
                        >
                            <Heart aria-hidden="true" />
                            <span>{favoriteLabel}</span>
                        </button>

                        <div className={styles.navigationControls}>
                            <button
                                className={styles.navigationButton}
                                type="button"
                                aria-label="Previous dog"
                                title="Previous dog"
                                disabled={isPreviousDogDisabled}
                                onClick={onPreviousDog}
                            >
                                <ChevronLeft aria-hidden="true" />
                            </button>

                            <button
                                className={styles.navigationButton}
                                type="button"
                                aria-label="Next dog"
                                title="Next dog"
                                disabled={isNextDogDisabled}
                                onClick={onNextDog}
                            >
                                <ChevronRight aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainDog;
