import { useQuery } from '@tanstack/react-query';
import { getRandomDogs } from '../api/dogs';

export function useDogs(count: number) {
    const {
        data: dogs = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['dogs', count],
        queryFn: () => getRandomDogs(count),
    });

    return {
        dogs,
        isLoading,
        error,
        refreshDogs: refetch,
    };
}
