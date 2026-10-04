import { useState } from 'react';
import type { Dog } from '../types/dog';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Dog[]>([]);

    function addFavorite(dog: Dog) {
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

    function removeFavorite(dog: Dog) {
        setFavorites((currentFavorites) =>
            currentFavorites.filter(
                (favorite) => favorite.imageUrl !== dog.imageUrl,
            ),
        );
    }

    function isFavorite(dog: Dog | null): boolean {
        if (!dog) {
            return false;
        }

        return favorites.some((favorite) => favorite.imageUrl === dog.imageUrl);
    }

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
}
