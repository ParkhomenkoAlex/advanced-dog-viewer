import { useState } from 'react';
import DogGallery from './components/DogGallery/DogGallery';
import Favorites from './components/Favorites/Favorites';
import MainDog from './components/MainDog/MainDog';
import { useDogs } from './hooks/useDogs';
import { useFavorites } from './hooks/useFavorites';
import type { Dog } from './types/dog';
import styles from './App.module.css';

function App() {
    const { dogs, isLoading, error } = useDogs(10);
    const [selectedDog, setSelectedDog] = useState<Dog | null>(null);

    const { favorites, addFavorite, removeFavorite, isFavorite } =
        useFavorites();

    const currentDog = selectedDog ?? dogs[0] ?? null;

    return (
        <main className={styles.app}>
            <h1>Advanced Dog Viewer</h1>

            {isLoading && <p>Loading dogs...</p>}

            {error && <p className={styles.error}>{error}</p>}

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
