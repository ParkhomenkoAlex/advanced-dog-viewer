export interface Dog {
    imageUrl: string;
    breed: string;
}

export interface DogsResponse {
    message: string[];
    status: string;
}

export interface BreedsResponse {
    message: Record<string, string[]>;
    status: string;
}

export interface Breed {
    name: string;
    subBreeds: string[];
}

export interface DogFilters {
    count: number;
    breed: string;
    subBreed: string;
}
