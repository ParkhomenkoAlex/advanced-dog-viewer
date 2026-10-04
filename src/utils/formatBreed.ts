export function formatBreed(breed: string): string {
  return breed
    .split('-')
    .reverse()
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
