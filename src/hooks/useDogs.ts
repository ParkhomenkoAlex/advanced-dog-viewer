import { useQuery } from '@tanstack/react-query';
import { getDogs } from '../api/dogs';
import type { IDogFilters } from '../interfaces/dog';

export function useDogs(filters: IDogFilters) {
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
