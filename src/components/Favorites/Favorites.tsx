import type { Dog } from '../../types/dog';
import { formatBreed } from '../../utils/formatBreed';
import styles from './Favorites.module.css';

interface FavoritesProps {
    favorites: Dog[];
    onSelectDog: (dog: Dog) => void;
    onRemoveFavorite: (dog: Dog) => void;
    onClearFavorites: () => void;
}

function Favorites({
    favorites,
    onSelectDog,
    onRemoveFavorite,
    onClearFavorites,
}: FavoritesProps) {
    return (
        <aside className={styles.favorites}>
            <div className={styles.header}>
                <h2>
                    Favorites
                    <span className={styles.count}>{favorites.length}</span>
                </h2>

                <button
                    className={styles.clearButton}
                    type="button"
                    onClick={onClearFavorites}
                    disabled={favorites.length === 0}
                >
                    Clear all
                </button>
            </div>

            {favorites.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No favorites yet.</p>
                    <span>Choose a dog and save it here.</span>
                </div>
            ) : (
                <ul className={styles.list}>
                    {favorites.map((dog) => (
                        <li className={styles.item} key={dog.imageUrl}>
                            <button
                                className={styles.dog}
                                type="button"
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
