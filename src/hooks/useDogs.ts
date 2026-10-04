import { useQuery } from '@tanstack/react-query';
import { getDogs } from '../api/dogs';
import type { DogFilters } from '../types/dog';

export function useDogs(filters: DogFilters) {
    const dogsQuery = useQuery({
        queryKey: ['dogs', filters],
        queryFn: () => getDogs(filters),
        refetchOnWindowFocus: false,
    });

    return {
        dogs: dogsQuery.data ?? [],
        isLoading: dogsQuery.isLoading,
        isFetching: dogsQuery.isFetching,
        error: dogsQuery.error,
        refreshDogs: dogsQuery.refetch,
    };
}
