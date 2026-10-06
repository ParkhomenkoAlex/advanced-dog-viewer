import { useEffect, useRef, useState } from 'react';
import type { Dog } from '../../types/dog';
import { formatBreed } from '../../utils/formatBreed';
import styles from './Favorites.module.css';

type SortOption = 'recently-added' | 'breed-asc' | 'breed-desc';

interface FavoritesProps {
    favorites: Dog[];
    currentDog: Dog | null;
    onSelectDog: (dog: Dog) => void;
    onRemoveFavorite: (dog: Dog) => void;
    onClearFavorites: () => void;
}

function Favorites({
    favorites,
    currentDog,
    onSelectDog,
    onRemoveFavorite,
    onClearFavorites,
}: FavoritesProps) {
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
                <h2>
                    Favorites
                    <span className={styles.count}>{favorites.length}</span>
                </h2>

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
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M4 7h10M4 12h7M4 17h4M17 5v14m0 0-3-3m3 3 3-3" />
                            </svg>
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
                        aria-label="Reset favorites"
                        title="Reset favorites"
                        onClick={onClearFavorites}
                        disabled={favorites.length === 0}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 5a7 7 0 1 1-6.32 4H8.1A5 5 0 1 0 12 7c-1.38 0-2.63.56-3.54 1.46L11 11H4V4l3.05 3.05A6.96 6.96 0 0 1 12 5z" />
                        </svg>
                    </button>
                </div>
            </div>

            {favorites.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No favorites yet.</p>
                    <span>Choose a dog and save it here.</span>
                </div>
            ) : (
                <ul className={styles.list}>
                    {sortedFavorites.map((dog) => (
                        <li className={styles.item} key={dog.imageUrl}>
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
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm-3 6h12l-1 12H7L6 9zm3 2v7h2v-7H9zm4 0v7h2v-7h-2z" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
}

export default Favorites;
