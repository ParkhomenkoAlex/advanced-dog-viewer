import type { Breed } from '../../types/dog';
import { formatBreed } from '../../utils/formatBreed';
import styles from './DogFilters.module.css';
import SearchableSelect from './SearchableSelect';

interface DogFiltersProps {
    breeds: Breed[];
    selectedBreed: string;
    selectedSubBreed: string;
    dogCount: number;
    isLoadingBreeds: boolean;
    onBreedChange: (value: string) => void;
    onSubBreedChange: (value: string) => void;
    onDogCountChange: (value: number) => void;
    onResetFilters: () => void;
}

const DOG_COUNTS = [10, 20, 30, 50];

function DogFilters({
    breeds,
    selectedBreed,
    selectedSubBreed,
    dogCount,
    isLoadingBreeds,
    onBreedChange,
    onSubBreedChange,
    onDogCountChange,
    onResetFilters,
}: DogFiltersProps) {
    const currentBreed = breeds.find((breed) => breed.name === selectedBreed);
    const subBreeds = currentBreed?.subBreeds ?? [];

    const hasActiveFilters =
        selectedBreed !== '' || selectedSubBreed !== '' || dogCount !== 10;

    return (
        <section className={styles.filters} aria-label="Dog filters">
            <div className={styles.field}>
                <label htmlFor="breed-select">Breed</label>

                <SearchableSelect
                    id="breed-select"
                    label="Breed"
                    value={selectedBreed}
                    options={breeds.map((breed) => ({
                        value: breed.name,
                        label: formatBreed(breed.name),
                    }))}
                    allOptionLabel={
                        isLoadingBreeds ? 'Loading breeds...' : 'All breeds'
                    }
                    disabled={isLoadingBreeds}
                    onChange={onBreedChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="sub-breed-select">Sub-breed</label>

                <SearchableSelect
                    id="sub-breed-select"
                    label="Sub-breed"
                    value={selectedSubBreed}
                    options={subBreeds.map((subBreed) => ({
                        value: subBreed,
                        label: formatBreed(subBreed),
                    }))}
                    allOptionLabel="All sub-breeds"
                    disabled={!selectedBreed || subBreeds.length === 0}
                    onChange={onSubBreedChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="dog-count-select">Dogs</label>

                <select
                    id="dog-count-select"
                    value={dogCount}
                    onChange={(event) =>
                        onDogCountChange(Number(event.target.value))
                    }
                >
                    {DOG_COUNTS.map((count) => (
                        <option key={count} value={count}>
                            {count}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.reset}>
                <button
                    className={styles.resetButton}
                    type="button"
                    onClick={onResetFilters}
                    disabled={!hasActiveFilters}
                    aria-label="Reset filters"
                    title="Reset filters"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 5a7 7 0 1 1-6.32 4H8.1A5 5 0 1 0 12 7c-1.38 0-2.63.56-3.54 1.46L11 11H4V4l3.05 3.05A6.96 6.96 0 0 1 12 5z" />
                    </svg>
                </button>
            </div>
        </section>
    );
}

export default DogFilters;
