import { RotateCcw } from 'lucide-react';
import type { IBreed } from '../../interfaces/dog';
import { formatBreed } from '../../utils/formatBreed';
import styles from './DogFilters.module.css';
import SearchableSelect from './SearchableSelect';

interface IDogFiltersProps {
    breeds: IBreed[];
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
}: IDogFiltersProps) {
    const currentBreed = breeds.find((breed) => breed.name === selectedBreed);
    const subBreeds = currentBreed?.subBreeds ?? [];

    const hasActiveFilters =
        selectedBreed !== '' || selectedSubBreed !== '' || dogCount !== 10;

    return (
        <section className={styles.filters} aria-label="Dog filters">
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="breed-select">
                    Breed
                </label>

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
                <label className={styles.fieldLabel} htmlFor="sub-breed-select">
                    Sub-breed
                </label>

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
                <label className={styles.fieldLabel} htmlFor="dog-count-select">
                    Dogs
                </label>

                <SearchableSelect
                    id="dog-count-select"
                    label="Dogs"
                    value={String(dogCount)}
                    options={DOG_COUNTS.map((count) => ({
                        value: String(count),
                        label: `${count} dogs`,
                    }))}
                    isSearchable={false}
                    onChange={(value) => onDogCountChange(Number(value))}
                />
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
                    <RotateCcw aria-hidden="true" />
                </button>
            </div>
        </section>
    );
}

export default DogFilters;
