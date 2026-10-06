export interface IDog {
    imageUrl: string;
    breed: string;
}

export interface IDogsResponse {
    message: string[];
    status: string;
}

export interface IBreedsResponse {
    message: Record<string, string[]>;
    status: string;
}

export interface IBreed {
    name: string;
    subBreeds: string[];
}

export interface IDogFilters {
    count: number;
    breed: string;
    subBreed: string;
}
