import type { IDog } from '../../interfaces/dog';
import { formatBreed } from '../../utils/formatBreed';
import styles from './DogGallery.module.css';

interface IDogGalleryProps {
    dogs: IDog[];
    selectedDog: IDog | null;
    onSelectDog: (dog: IDog) => void;
}

function DogGallery({ dogs, selectedDog, onSelectDog }: IDogGalleryProps) {
    return (
        <section className={styles.dogGallery}>
            {dogs.map((dog) => {
                const isSelected = dog.imageUrl === selectedDog?.imageUrl;

                return (
                    <button
                        className={`${styles.dogThumbnail} ${
                            isSelected ? styles.selectedDog : ''
                        }`}
                        key={dog.imageUrl}
                        type="button"
                        aria-pressed={isSelected}
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
