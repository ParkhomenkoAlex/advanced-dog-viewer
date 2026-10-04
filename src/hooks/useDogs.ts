import { useEffect, useState } from 'react';
import { getRandomDogs } from '../api/dogs';
import type { Dog } from '../types/dog';

export function useDogs(count: number) {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadDogs() {
            try {
                const dogs = await getRandomDogs(count);

                setDogs(dogs);
            } catch (error) {
                console.error(error);
                setError('Failed to load dogs. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }

        void loadDogs();
    }, [count]);

    return {
        dogs,
        isLoading,
        error,
    };
}
