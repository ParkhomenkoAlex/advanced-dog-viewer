import type {
    Breed,
    BreedsResponse,
    Dog,
    DogFilters,
    DogsResponse,
} from '../types/dog';

const DOG_API_URL = 'https://dog.ceo/api';

function getBreedFromImageUrl(imageUrl: string): string {
    const { pathname } = new URL(imageUrl);
    const breed = pathname.split('/breeds/')[1]?.split('/')[0];

    return breed ?? 'unknown';
}

function mapImageUrlsToDogs(imageUrls: string[]): Dog[] {
    return imageUrls.map((imageUrl) => ({
        imageUrl,
        breed: getBreedFromImageUrl(imageUrl),
    }));
}

async function fetchDogs(url: string): Promise<Dog[]> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch dogs: ${response.status}`);
    }

    const data: DogsResponse = await response.json();

    if (data.status !== 'success' || !Array.isArray(data.message)) {
        throw new Error('Invalid response from Dog API');
    }

    return mapImageUrlsToDogs(data.message);
}

export async function getDogs({
    count,
    breed,
    subBreed,
}: DogFilters): Promise<Dog[]> {
    if (breed && subBreed) {
        return fetchDogs(
            `${DOG_API_URL}/breed/${breed}/${subBreed}/images/random/${count}`,
        );
    }

    if (breed) {
        return fetchDogs(
            `${DOG_API_URL}/breed/${breed}/images/random/${count}`,
        );
    }

    return fetchDogs(`${DOG_API_URL}/breeds/image/random/${count}`);
}

export async function getBreeds(): Promise<Breed[]> {
    const response = await fetch(`${DOG_API_URL}/breeds/list/all`);

    if (!response.ok) {
        throw new Error(`Failed to fetch breeds: ${response.status}`);
    }

    const data: BreedsResponse = await response.json();

    if (
        data.status !== 'success' ||
        !data.message ||
        typeof data.message !== 'object' ||
        Array.isArray(data.message)
    ) {
        throw new Error('Invalid response from Dog API');
    }

    return Object.entries(data.message).map(([name, subBreeds]) => ({
        name,
        subBreeds,
    }));
}
