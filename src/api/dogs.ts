import type { Dog, DogsResponse } from '../types/dog';

const DOG_API_URL = 'https://dog.ceo/api';

function getBreedFromImageUrl(imageUrl: string): string {
  const { pathname } = new URL(imageUrl);
  const breed = pathname.split('/breeds/')[1]?.split('/')[0];

  return breed ?? 'unknown';
}

export async function getRandomDogs(count: number): Promise<Dog[]> {
  const response = await fetch(`${DOG_API_URL}/breeds/image/random/${count}`);

  if (!response.ok) {
    throw new Error('Failed to fetch dogs');
  }

  const data: DogsResponse = await response.json();

  return data.message.map((imageUrl) => ({
    imageUrl,
    breed: getBreedFromImageUrl(imageUrl),
  }));
}
