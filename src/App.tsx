import { useEffect, useState } from 'react';
import { getRandomDogs } from './api/dogs';
import DogGallery from './components/DogGallery/DogGallery';
import Favorites from './components/Favorites/Favorites';
import MainDog from './components/MainDog/MainDog';
import type { Dog } from './types/dog';
import styles from './App.module.css';

function App() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDogs() {
      try {
        const dogs = await getRandomDogs(10);

        setDogs(dogs);
        setSelectedDog(dogs[0]);
      } catch (error) {
        console.error(error);
        setError('Failed to load dogs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    void loadDogs();
  }, []);

  function addToFavorites(dog: Dog) {
    setFavorites((currentFavorites) => {
      const isAlreadyFavorite = currentFavorites.some(
        (favorite) => favorite.imageUrl === dog.imageUrl,
      );

      if (isAlreadyFavorite) {
        return currentFavorites;
      }

      return [...currentFavorites, dog];
    });
  }

  function removeFromFavorites(dog: Dog) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.imageUrl !== dog.imageUrl),
    );
  }

  const isSelectedDogFavorite = selectedDog
    ? favorites.some((favorite) => favorite.imageUrl === selectedDog.imageUrl)
    : false;

  return (
    <main className={styles.app}>
      <h1>Dog Viewer</h1>

      {isLoading && <p>Loading dogs...</p>}

      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && (
        <div className={styles.layout}>
          <div className={styles.content}>
            {selectedDog && (
              <MainDog
                dog={selectedDog}
                isFavorite={isSelectedDogFavorite}
                onAddToFavorites={addToFavorites}
              />
            )}

            <DogGallery
              dogs={dogs}
              selectedDog={selectedDog}
              onSelectDog={setSelectedDog}
            />
          </div>

          <Favorites
            favorites={favorites}
            onSelectDog={setSelectedDog}
            onRemoveFavorite={removeFromFavorites}
          />
        </div>
      )}
    </main>
  );
}

export default App;
