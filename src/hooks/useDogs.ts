import { useQuery } from '@tanstack/react-query';
import { getRandomDogs } from '../api/dogs';

export function useDogs(count: number) {
    const dogsQuery = useQuery({
        queryKey: ['dogs', count],
        queryFn: () => getRandomDogs(count),
    });

    return {
        dogs: dogsQuery.data ?? [],
        isLoading: dogsQuery.isLoading,
        isFetching: dogsQuery.isFetching,
        error: dogsQuery.error,
        refreshDogs: dogsQuery.refetch,
    };
}
