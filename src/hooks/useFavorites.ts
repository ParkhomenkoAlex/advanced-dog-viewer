import { useEffect, useState } from 'react';
import type { Dog } from '../types/dog';

const FAVORITES_STORAGE_KEY = 'advanced-dog-viewer-favorites';

function getStoredFavorites(): Dog[] {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

        if (!storedFavorites) {
            return [];
        }

        const parsedFavorites: unknown = JSON.parse(storedFavorites);

        if (!Array.isArray(parsedFavorites)) {
            return [];
        }

        return parsedFavorites.filter(
            (favorite): favorite is Dog =>
                typeof favorite === 'object' &&
                favorite !== null &&
                'imageUrl' in favorite &&
                typeof favorite.imageUrl === 'string' &&
                'breed' in favorite &&
                typeof favorite.breed === 'string',
        );
    } catch {
        return [];
    }
}

export function useFavorites() {
    const [favorites, setFavorites] = useState<Dog[]>(getStoredFavorites);

    useEffect(() => {
        try {
            localStorage.setItem(
                FAVORITES_STORAGE_KEY,
                JSON.stringify(favorites),
            );
        } catch {
            // Ignore storage errors and keep favorites available for this session.
        }
    }, [favorites]);

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

    function clearFavorites() {
        setFavorites([]);
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
        clearFavorites,
        isFavorite,
    };
}
