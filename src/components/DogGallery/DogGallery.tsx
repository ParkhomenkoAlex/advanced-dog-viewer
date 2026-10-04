import type { Dog } from '../../types/dog';
import { formatBreed } from '../../utils/formatBreed';
import styles from './DogGallery.module.css';

interface DogGalleryProps {
  dogs: Dog[];
  selectedDog: Dog | null;
  onSelectDog: (dog: Dog) => void;
}

function DogGallery({ dogs, selectedDog, onSelectDog }: DogGalleryProps) {
  return (
    <section className={styles.dogGallery}>
      {dogs.map((dog) => {
        const isSelected = dog.imageUrl === selectedDog?.imageUrl;

        return (
          <button
            className={`${styles.dogThumbnail} ${
              isSelected ? styles.selected : ''
            }`}
            key={dog.imageUrl}
            type="button"
            onClick={() => onSelectDog(dog)}
          >
            <img src={dog.imageUrl} alt={formatBreed(dog.breed)} />
            <span>{formatBreed(dog.breed)}</span>
          </button>
        );
      })}
    </section>
  );
}

export default DogGallery;
