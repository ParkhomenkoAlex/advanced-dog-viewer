import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { IDog } from '../../interfaces/dog';
import { formatBreed } from '../../utils/formatBreed';
import styles from './DogGallery.module.css';

interface IDogGalleryProps {
    dogs: IDog[];
    selectedDog: IDog | null;
    onSelectDog: (dog: IDog) => void;
}

interface IGalleryNavigationState {
    isScrollable: boolean;
    isAtStart: boolean;
    isAtEnd: boolean;
}

const INITIAL_NAVIGATION_STATE: IGalleryNavigationState = {
    isScrollable: false,
    isAtStart: true,
    isAtEnd: true,
};

function DogGallery({ dogs, selectedDog, onSelectDog }: IDogGalleryProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [navigationState, setNavigationState] =
        useState<IGalleryNavigationState>(INITIAL_NAVIGATION_STATE);

    const updateNavigationState = useCallback(() => {
        const scrollContainer = scrollContainerRef.current;

        if (!scrollContainer) {
            return;
        }

        const maxScrollLeft =
            scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const isScrollable = maxScrollLeft > 1;
        const nextNavigationState = {
            isScrollable,
            isAtStart: !isScrollable || scrollContainer.scrollLeft <= 1,
            isAtEnd:
                !isScrollable ||
                scrollContainer.scrollLeft >= maxScrollLeft - 1,
        };

        setNavigationState((currentNavigationState) =>
            currentNavigationState.isScrollable ===
                nextNavigationState.isScrollable &&
            currentNavigationState.isAtStart ===
                nextNavigationState.isAtStart &&
            currentNavigationState.isAtEnd === nextNavigationState.isAtEnd
                ? currentNavigationState
                : nextNavigationState,
        );
    }, []);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (!scrollContainer) {
            return;
        }

        const resizeObserver = new ResizeObserver(updateNavigationState);
        resizeObserver.observe(scrollContainer);
        scrollContainer.addEventListener('scroll', updateNavigationState, {
            passive: true,
        });

        const animationFrame = window.requestAnimationFrame(
            updateNavigationState,
        );

        return () => {
            window.cancelAnimationFrame(animationFrame);
            resizeObserver.disconnect();
            scrollContainer.removeEventListener(
                'scroll',
                updateNavigationState,
            );
        };
    }, [dogs, updateNavigationState]);

    function scrollGallery(direction: 'previous' | 'next') {
        const scrollContainer = scrollContainerRef.current;

        if (!scrollContainer) {
            return;
        }

        scrollContainer.scrollBy({
            left:
                (direction === 'previous' ? -1 : 1) *
                scrollContainer.clientWidth *
                0.9,
            behavior: 'smooth',
        });
    }

    return (
        <section className={styles.dogGallery} aria-label="Dog gallery">
            <div
                ref={scrollContainerRef}
                className={`${styles.filmstrip} ${
                    navigationState.isScrollable ? '' : styles.centered
                }`}
            >
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
                            <img
                                src={dog.imageUrl}
                                alt={formatBreed(dog.breed)}
                            />
                            <span>{formatBreed(dog.breed)}</span>
                        </button>
                    );
                })}
            </div>

            {navigationState.isScrollable && (
                <>
                    <button
                        className={`${styles.navigationButton} ${styles.previousButton}`}
                        type="button"
                        aria-label="Scroll gallery left"
                        disabled={navigationState.isAtStart}
                        onClick={() => scrollGallery('previous')}
                    >
                        <ChevronLeft aria-hidden="true" />
                    </button>

                    <button
                        className={`${styles.navigationButton} ${styles.nextButton}`}
                        type="button"
                        aria-label="Scroll gallery right"
                        disabled={navigationState.isAtEnd}
                        onClick={() => scrollGallery('next')}
                    >
                        <ChevronRight aria-hidden="true" />
                    </button>
                </>
            )}
        </section>
    );
}

export default DogGallery;
