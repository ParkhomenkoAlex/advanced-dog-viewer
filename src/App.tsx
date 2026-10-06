import { useCallback, useRef, useState } from 'react';
import { Heart, RefreshCw } from 'lucide-react';
import DogFilters from './components/DogFilters/DogFilters';
import DogGallery from './components/DogGallery/DogGallery';
import Favorites from './components/Favorites/Favorites';
import FavoritesDrawer from './components/FavoritesDrawer/FavoritesDrawer';
import MainDog from './components/MainDog/MainDog';
import { useBreeds } from './hooks/useBreeds';
import { useDogs } from './hooks/useDogs';
import { useFavorites } from './hooks/useFavorites';
import type { IDog } from './interfaces/dog';
import styles from './App.module.css';

function App() {
    const [selectedDog, setSelectedDog] = useState<IDog | null>(null);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [selectedSubBreed, setSelectedSubBreed] = useState('');
    const [dogCount, setDogCount] = useState(10);
    const [dogsDatasetId, setDogsDatasetId] = useState(0);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const favoritesTriggerRef = useRef<HTMLButtonElement>(null);

    const {
        breeds,
        isLoading: isLoadingBreeds,
        error: breedsError,
    } = useBreeds();

    const {
        dogs,
        isLoading,
        isFetching,
        error,
        loadMoreError,
        isLoadingMore,
        isLoadMoreDisabled,
        availableDogsCount,
        loadMoreDogs,
    } = useDogs(
        {
            count: dogCount,
            breed: selectedBreed,
            subBreed: selectedSubBreed,
        },
        dogsDatasetId,
    );

    const {
        favorites,
        removeFavorite,
        toggleFavorite,
        clearFavorites,
        isFavorite,
    } = useFavorites();

    const currentDog = selectedDog ?? dogs[0] ?? null;
    const currentDogIndex = currentDog
        ? dogs.findIndex((dog) => dog.imageUrl === currentDog.imageUrl)
        : -1;
    const isPreviousDogDisabled = currentDogIndex <= 0;
    const isNextDogDisabled =
        currentDogIndex === -1 || currentDogIndex === dogs.length - 1;
    const hasHero = !isLoading && !error && currentDog !== null;

    function handleRefreshDogs() {
        setSelectedDog(null);
        setDogsDatasetId((currentDatasetId) => currentDatasetId + 1);
    }

    const handleCloseFavorites = useCallback(() => {
        setIsFavoritesOpen(false);
    }, []);

    function handleBreedChange(breed: string) {
        setSelectedBreed(breed);
        setSelectedSubBreed('');
        setSelectedDog(null);
        setDogsDatasetId((currentDatasetId) => currentDatasetId + 1);
    }

    function handleSubBreedChange(subBreed: string) {
        setSelectedSubBreed(subBreed);
        setSelectedDog(null);
        setDogsDatasetId((currentDatasetId) => currentDatasetId + 1);
    }

    function handleDogCountChange(count: number) {
        setDogCount(count);
        setSelectedDog(null);
        setDogsDatasetId((currentDatasetId) => currentDatasetId + 1);
    }

    function handleResetFilters() {
        setSelectedBreed('');
        setSelectedSubBreed('');
        setDogCount(10);
        setSelectedDog(null);
        setDogsDatasetId((currentDatasetId) => currentDatasetId + 1);
    }

    function handlePreviousDog() {
        if (currentDogIndex <= 0) {
            return;
        }

        setSelectedDog(dogs[currentDogIndex - 1]);
    }

    function handleNextDog() {
        if (currentDogIndex === -1 || currentDogIndex >= dogs.length - 1) {
            return;
        }

        setSelectedDog(dogs[currentDogIndex + 1]);
    }

    return (
        <main className={styles.app}>
            <div
                className={`${styles.heroComposition} ${
                    hasHero ? styles.hasHero : ''
                }`}
            >
                <header className={styles.header}>
                    <h1 className={styles.wordmark}>
                        <span>Advanced</span>
                        <span>Dog Viewer</span>
                    </h1>

                    <div className={styles.headerFilters}>
                        <DogFilters
                            breeds={breeds}
                            selectedBreed={selectedBreed}
                            selectedSubBreed={selectedSubBreed}
                            dogCount={dogCount}
                            isLoadingBreeds={isLoadingBreeds}
                            onBreedChange={handleBreedChange}
                            onSubBreedChange={handleSubBreedChange}
                            onDogCountChange={handleDogCountChange}
                            onResetFilters={handleResetFilters}
                        />
                    </div>

                    <div className={styles.headerActions}>
                        <button
                            className={styles.refreshButton}
                            type="button"
                            aria-label="Refresh dogs"
                            title="Refresh dogs"
                            onClick={handleRefreshDogs}
                            disabled={isFetching}
                        >
                            <RefreshCw
                                className={isFetching ? styles.spinning : ''}
                                aria-hidden="true"
                            />
                        </button>

                        <button
                            ref={favoritesTriggerRef}
                            className={styles.favoritesTrigger}
                            type="button"
                            aria-label={`View favorites (${favorites.length})`}
                            aria-haspopup="dialog"
                            aria-expanded={isFavoritesOpen}
                            aria-controls="favorites-drawer"
                            onClick={() => setIsFavoritesOpen(true)}
                        >
                            <Heart aria-hidden="true" />
                            <span>Favorites</span>
                            <strong>{favorites.length}</strong>
                        </button>
                    </div>
                </header>

                {hasHero && (
                    <MainDog
                        dog={currentDog}
                        isFavorite={isFavorite(currentDog)}
                        onToggleFavorite={toggleFavorite}
                        onPreviousDog={handlePreviousDog}
                        onNextDog={handleNextDog}
                        isPreviousDogDisabled={isPreviousDogDisabled}
                        isNextDogDisabled={isNextDogDisabled}
                    />
                )}
            </div>

            {breedsError && (
                <p className={styles.error} role="alert">
                    Failed to load breeds: {breedsError.message}
                </p>
            )}

            {isLoading && <p aria-live="polite">Loading dogs...</p>}

            {error && (
                <p className={styles.error} role="alert">
                    Failed to load dogs: {error.message}
                </p>
            )}

            {loadMoreError && (
                <p className={styles.error} role="alert">
                    Failed to load more dogs: {loadMoreError.message}
                </p>
            )}

            {!isLoading && !error && (
                <div className={styles.layout}>
                    <div className={styles.content}>
                        <DogGallery
                            dogs={dogs}
                            selectedDog={currentDog}
                            onSelectDog={setSelectedDog}
                        />

                        <div className={styles.galleryActions}>
                            <button
                                className={styles.loadMoreButton}
                                type="button"
                                disabled={isLoadingMore || isLoadMoreDisabled}
                                onClick={() => void loadMoreDogs()}
                            >
                                {isLoadingMore ? 'Loading...' : 'Load More'}
                            </button>

                            {availableDogsCount !== null && (
                                <p className={styles.galleryStatus}>
                                    Showing {dogs.length} of{' '}
                                    {availableDogsCount}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <FavoritesDrawer
                isOpen={isFavoritesOpen}
                triggerRef={favoritesTriggerRef}
                onClose={handleCloseFavorites}
            >
                <Favorites
                    favorites={favorites}
                    currentDog={currentDog}
                    onSelectDog={setSelectedDog}
                    onRemoveFavorite={removeFavorite}
                    onClearFavorites={clearFavorites}
                />
            </FavoritesDrawer>
        </main>
    );
}

export default App;
