import { useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllDogsForFilter, getDogs } from '../api/dogs';
import type { IDog, IDogFilters } from '../interfaces/dog';

// Limit retries per operation because the random endpoint can repeatedly
// return images that are already displayed.
const MAX_RANDOM_DOG_REQUESTS = 10;

type DogsQueryData = {
    dogs: IDog[];
    availableDogs: IDog[] | null;
};

type LoadMoreStatus = {
    datasetId: number;
    requestId: number;
    isLoading: boolean;
    error: Error | null;
};

type ActiveLoadMoreRequest = {
    datasetId: number;
    requestId: number;
};

function getUniqueDogs(dogs: IDog[]): IDog[] {
    const imageUrls = new Set<string>();

    return dogs.filter((dog) => {
        if (imageUrls.has(dog.imageUrl)) {
            return false;
        }

        imageUrls.add(dog.imageUrl);
        return true;
    });
}

function shuffleDogs(dogs: IDog[]): IDog[] {
    const shuffledDogs = [...dogs];

    for (let index = shuffledDogs.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledDogs[index], shuffledDogs[randomIndex]] = [
            shuffledDogs[randomIndex],
            shuffledDogs[index],
        ];
    }

    return shuffledDogs;
}

function appendUniqueDogs(currentDogs: IDog[], nextDogs: IDog[]): IDog[] {
    const imageUrls = new Set(currentDogs.map((dog) => dog.imageUrl));
    const uniqueNextDogs = nextDogs.filter((dog) => {
        if (imageUrls.has(dog.imageUrl)) {
            return false;
        }

        imageUrls.add(dog.imageUrl);
        return true;
    });

    return [...currentDogs, ...uniqueNextDogs];
}

async function getNewUniqueRandomDogs(
    filters: IDogFilters,
    existingDogs: IDog[],
    count: number,
): Promise<IDog[]> {
    const imageUrls = new Set(existingDogs.map((dog) => dog.imageUrl));
    const newDogs: IDog[] = [];
    let requestsCount = 0;

    // All breeds has no finite image pool endpoint, so retries replace
    // duplicates without treating a partial batch as exhaustion.
    while (newDogs.length < count && requestsCount < MAX_RANDOM_DOG_REQUESTS) {
        const requestedDogs = await getDogs({
            ...filters,
            count: count - newDogs.length,
        });

        requestedDogs.forEach((dog) => {
            if (!imageUrls.has(dog.imageUrl)) {
                imageUrls.add(dog.imageUrl);
                newDogs.push(dog);
            }
        });

        requestsCount += 1;
    }

    return newDogs;
}

async function getInitialDogs(filters: IDogFilters): Promise<DogsQueryData> {
    if (filters.breed) {
        // The complete pool makes specific-filter exhaustion deterministic.
        const availableDogs = shuffleDogs(
            getUniqueDogs(await getAllDogsForFilter(filters)),
        );

        return {
            dogs: availableDogs.slice(0, filters.count),
            availableDogs,
        };
    }

    return {
        dogs: await getNewUniqueRandomDogs(filters, [], filters.count),
        availableDogs: null,
    };
}

export function useDogs(filters: IDogFilters, datasetId: number) {
    const queryClient = useQueryClient();
    const queryKey = [
        'dogs',
        datasetId,
        filters.count,
        filters.breed,
        filters.subBreed,
    ] as const;
    const [loadMoreStatus, setLoadMoreStatus] = useState<LoadMoreStatus>({
        datasetId: -1,
        requestId: 0,
        isLoading: false,
        error: null,
    });
    const nextRequestIdRef = useRef(0);
    const activeRequestRef = useRef<ActiveLoadMoreRequest | null>(null);
    const dogsQuery = useQuery({
        queryKey,
        queryFn: () => getInitialDogs(filters),
        refetchOnWindowFocus: false,
    });
    const dogs = dogsQuery.data?.dogs ?? [];
    const availableDogsCount = dogsQuery.data?.availableDogs?.length ?? null;
    const isSpecificFilter = filters.breed !== '';
    const isLoadMoreDisabled =
        dogsQuery.isFetching ||
        (isSpecificFilter &&
            (availableDogsCount === null || dogs.length >= availableDogsCount));
    const isLoadingMore =
        loadMoreStatus.datasetId === datasetId && loadMoreStatus.isLoading;
    const loadMoreError =
        loadMoreStatus.datasetId === datasetId ? loadMoreStatus.error : null;

    async function loadMoreDogs() {
        const currentData = dogsQuery.data;

        if (
            !currentData ||
            isLoadMoreDisabled ||
            activeRequestRef.current?.datasetId === datasetId
        ) {
            return;
        }

        const requestId = nextRequestIdRef.current + 1;

        nextRequestIdRef.current = requestId;
        activeRequestRef.current = { datasetId, requestId };
        setLoadMoreStatus({
            datasetId,
            requestId,
            isLoading: true,
            error: null,
        });

        try {
            const nextDogs = currentData.availableDogs
                ? currentData.availableDogs
                      .filter(
                          (dog) =>
                              !dogs.some(
                                  (currentDog) =>
                                      currentDog.imageUrl === dog.imageUrl,
                              ),
                      )
                      .slice(0, filters.count)
                : await getNewUniqueRandomDogs(filters, dogs, filters.count);

            // Each dataset has its own query key, so an older request can only
            // update its old cache entry after filters change or refresh.
            queryClient.setQueryData<DogsQueryData>(queryKey, (data) =>
                data
                    ? {
                          ...data,
                          dogs: appendUniqueDogs(data.dogs, nextDogs),
                      }
                    : data,
            );
        } catch (error) {
            setLoadMoreStatus((currentStatus) =>
                currentStatus.datasetId === datasetId &&
                currentStatus.requestId === requestId
                    ? {
                          ...currentStatus,
                          isLoading: false,
                          error:
                              error instanceof Error
                                  ? error
                                  : new Error('Failed to load more dogs'),
                      }
                    : currentStatus,
            );
        } finally {
            if (
                activeRequestRef.current?.datasetId === datasetId &&
                activeRequestRef.current.requestId === requestId
            ) {
                activeRequestRef.current = null;
            }

            setLoadMoreStatus((currentStatus) =>
                currentStatus.datasetId === datasetId &&
                currentStatus.requestId === requestId
                    ? { ...currentStatus, isLoading: false }
                    : currentStatus,
            );
        }
    }

    return {
        dogs,
        isLoading: dogsQuery.isLoading,
        isFetching: dogsQuery.isFetching,
        error: dogsQuery.error,
        loadMoreError,
        isLoadingMore,
        isLoadMoreDisabled,
        availableDogsCount,
        loadMoreDogs,
    };
}
