import { useState } from 'react';
import DogGallery from './components/DogGallery/DogGallery';
import Favorites from './components/Favorites/Favorites';
import MainDog from './components/MainDog/MainDog';
import { useDogs } from './hooks/useDogs';
import { useFavorites } from './hooks/useFavorites';
import type { Dog } from './types/dog';
import styles from './App.module.css';

function App() {
    const { dogs, isLoading, isFetching, error, refreshDogs } = useDogs(10);
    const [selectedDog, setSelectedDog] = useState<Dog | null>(null);

    const { favorites, addFavorite, removeFavorite, isFavorite } =
        useFavorites();

    const currentDog = selectedDog ?? dogs[0] ?? null;

    function handleRefreshDogs() {
        setSelectedDog(null);
        void refreshDogs();
    }

    return (
        <main className={styles.app}>
            <div className={styles.header}>
                <h1>Advanced Dog Viewer</h1>

                <button
                    className={styles.refreshButton}
                    type="button"
                    aria-label="Refresh dogs"
                    title="Refresh dogs"
                    onClick={handleRefreshDogs}
                    disabled={isFetching}
                >
                    <svg
                        className={isFetching ? styles.spinning : ''}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4a8 8 0 1 0 7.75 10h-2.1A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                    </svg>
                </button>
            </div>

            {isLoading && <p>Loading dogs...</p>}

            {error && <p className={styles.error}>{error.message}</p>}

            {!isLoading && !error && (
                <div className={styles.layout}>
                    <div className={styles.content}>
                        {currentDog && (
                            <MainDog
                                dog={currentDog}
                                isFavorite={isFavorite(currentDog)}
                                onAddToFavorites={addFavorite}
                            />
                        )}

                        <DogGallery
                            dogs={dogs}
                            selectedDog={currentDog}
                            onSelectDog={setSelectedDog}
                        />
                    </div>

                    <Favorites
                        favorites={favorites}
                        onSelectDog={setSelectedDog}
                        onRemoveFavorite={removeFavorite}
                    />
                </div>
            )}
        </main>
    );
}

export default App;
