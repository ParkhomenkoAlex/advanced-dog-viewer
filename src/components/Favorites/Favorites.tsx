import { useEffect, useRef, useState } from 'react';
import { ArrowDownUp, Heart, RotateCcw, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { IDog } from '../../interfaces/dog';
import { formatBreed } from '../../utils/formatBreed';
import styles from './Favorites.module.css';

type SortOption = 'recently-added' | 'breed-asc' | 'breed-desc';

interface IFavoritesProps {
    favorites: IDog[];
    currentDog: IDog | null;
    onSelectDog: (dog: IDog) => void;
    onRemoveFavorite: (dog: IDog) => void;
    onClearFavorites: () => void;
}

function Favorites({
    favorites,
    currentDog,
    onSelectDog,
    onRemoveFavorite,
    onClearFavorites,
}: IFavoritesProps) {
    const [sortOption, setSortOption] = useState<SortOption>('recently-added');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortControlRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsSortOpen(false);
            }
        }

        function handlePointerDown(event: PointerEvent) {
            const target = event.target;

            if (
                target instanceof Node &&
                !sortControlRef.current?.contains(target)
            ) {
                setIsSortOpen(false);
            }
        }

        if (!isSortOpen) {
            return;
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('pointerdown', handlePointerDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [isSortOpen]);

    const sortedFavorites = (() => {
        if (sortOption === 'recently-added') {
            return [...favorites].reverse();
        }

        return [...favorites].sort((firstDog, secondDog) => {
            const comparison = formatBreed(firstDog.breed).localeCompare(
                formatBreed(secondDog.breed),
            );

            return sortOption === 'breed-asc' ? comparison : -comparison;
        });
    })();

    function handleSortOptionChange(option: SortOption) {
        setSortOption(option);
        setIsSortOpen(false);
    }

    return (
        <aside className={styles.favorites}>
            <div className={styles.header}>
                <p className={styles.count}>
                    {favorites.length}{' '}
                    {favorites.length === 1 ? 'dog saved' : 'dogs saved'}
                </p>

                <div className={styles.toolbarActions}>
                    <div className={styles.sortControl} ref={sortControlRef}>
                        <button
                            className={`${styles.toolbarButton} ${styles.sortButton}`}
                            type="button"
                            aria-label="Sort favorites"
                            title="Sort favorites"
                            aria-expanded={isSortOpen}
                            aria-controls="favorites-sort-options"
                            disabled={favorites.length === 0}
                            onClick={() => setIsSortOpen((isOpen) => !isOpen)}
                        >
                            <ArrowDownUp aria-hidden="true" />
                        </button>

                        {isSortOpen && (
                            <div
                                className={styles.sortPopup}
                                id="favorites-sort-options"
                            >
                                <button
                                    className={`${styles.sortOption} ${
                                        sortOption === 'recently-added'
                                            ? styles.selectedSortOption
                                            : ''
                                    }`}
                                    type="button"
                                    aria-pressed={
                                        sortOption === 'recently-added'
                                    }
                                    onClick={() =>
                                        handleSortOptionChange('recently-added')
                                    }
                                >
                                    Recently added
                                </button>

                                <button
                                    className={`${styles.sortOption} ${
                                        sortOption === 'breed-asc'
                                            ? styles.selectedSortOption
                                            : ''
                                    }`}
                                    type="button"
                                    aria-pressed={sortOption === 'breed-asc'}
                                    onClick={() =>
                                        handleSortOptionChange('breed-asc')
                                    }
                                >
                                    Breed A → Z
                                </button>

                                <button
                                    className={`${styles.sortOption} ${
                                        sortOption === 'breed-desc'
                                            ? styles.selectedSortOption
                                            : ''
                                    }`}
                                    type="button"
                                    aria-pressed={sortOption === 'breed-desc'}
                                    onClick={() =>
                                        handleSortOptionChange('breed-desc')
                                    }
                                >
                                    Breed Z → A
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        className={styles.toolbarButton}
                        type="button"
                        aria-label="Clear favorites"
                        title="Clear favorites"
                        onClick={onClearFavorites}
                        disabled={favorites.length === 0}
                    >
                        <RotateCcw aria-hidden="true" />
                    </button>
                </div>
            </div>

            {favorites.length === 0 ? (
                <div className={styles.emptyState}>
                    <Heart aria-hidden="true" />
                    <p>No favorites yet.</p>
                    <span>Choose a dog and save it here.</span>
                </div>
            ) : (
                <ul className={styles.list}>
                    <AnimatePresence initial={false}>
                        {sortedFavorites.map((dog) => (
                            <motion.li
                                className={styles.item}
                                key={dog.imageUrl}
                                layout
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.18, ease: 'easeOut' }}
                            >
                                <button
                                    className={`${styles.dog} ${
                                        dog.imageUrl === currentDog?.imageUrl
                                            ? styles.selectedDog
                                            : ''
                                    }`}
                                    type="button"
                                    aria-pressed={
                                        dog.imageUrl === currentDog?.imageUrl
                                    }
                                    onClick={() => onSelectDog(dog)}
                                >
                                    <img
                                        src={dog.imageUrl}
                                        alt={formatBreed(dog.breed)}
                                    />
                                    <span>{formatBreed(dog.breed)}</span>
                                </button>

                                <button
                                    className={styles.removeButton}
                                    type="button"
                                    aria-label={`Remove ${formatBreed(dog.breed)} from favorites`}
                                    title="Remove from favorites"
                                    onClick={() => onRemoveFavorite(dog)}
                                >
                                    <Trash2 aria-hidden="true" />
                                </button>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            )}
        </aside>
    );
}

export default Favorites;
