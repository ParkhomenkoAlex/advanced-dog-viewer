import { useQuery } from '@tanstack/react-query';
import { getBreeds } from '../api/dogs';

export function useBreeds() {
    const breedsQuery = useQuery({
        queryKey: ['breeds'],
        queryFn: getBreeds,
        staleTime: Infinity,
    });

    return {
        breeds: breedsQuery.data ?? [],
        isLoading: breedsQuery.isLoading,
        error: breedsQuery.error,
    };
}
