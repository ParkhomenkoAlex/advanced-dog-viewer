import {
    useEffect,
    useRef,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { ChevronDown, Search } from 'lucide-react';
import styles from './SearchableSelect.module.css';

export interface ISearchableSelectOption {
    value: string;
    label: string;
}

interface ISearchableSelectProps {
    id: string;
    label: string;
    value: string;
    options: ISearchableSelectOption[];
    allOptionLabel?: string;
    isSearchable?: boolean;
    disabled?: boolean;
    onChange: (value: string) => void;
}

function SearchableSelect({
    id,
    label,
    value,
    options,
    allOptionLabel,
    isSearchable = true,
    disabled = false,
    onChange,
}: ISearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listboxId = `${id}-options`;

    const selectedOption = options.find((option) => option.value === value);
    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );

    function closeDropdown(shouldRestoreFocus = false) {
        setIsOpen(false);
        setSearchTerm('');

        if (shouldRestoreFocus) {
            triggerRef.current?.focus();
        }
    }

    function handleSelect(nextValue: string) {
        onChange(nextValue);
        closeDropdown();
    }

    function focusOption(index: number) {
        const optionButtons = Array.from(
            selectRef.current?.querySelectorAll<HTMLButtonElement>(
                '[role="option"]',
            ) ?? [],
        );

        if (optionButtons.length === 0) {
            return;
        }

        const normalizedIndex =
            ((index % optionButtons.length) + optionButtons.length) %
            optionButtons.length;
        optionButtons[normalizedIndex]?.focus();
    }

    function focusSelectedOption() {
        const optionButtons = Array.from(
            selectRef.current?.querySelectorAll<HTMLButtonElement>(
                '[role="option"]',
            ) ?? [],
        );
        const selectedIndex = optionButtons.findIndex(
            (optionButton) =>
                optionButton.getAttribute('aria-selected') === 'true',
        );

        focusOption(selectedIndex >= 0 ? selectedIndex : 0);
    }

    function handleTriggerKeyDown(
        event: ReactKeyboardEvent<HTMLButtonElement>,
    ) {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
            return;
        }

        event.preventDefault();

        if (isOpen) {
            focusOption(event.key === 'ArrowDown' ? 0 : -1);
            return;
        }

        setIsOpen(true);

        if (!isSearchable) {
            window.requestAnimationFrame(() => focusSelectedOption());
        }
    }

    function handleSearchKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            focusOption(event.key === 'ArrowDown' ? 0 : -1);
        }
    }

    function handleOptionsKeyDown(event: ReactKeyboardEvent<HTMLUListElement>) {
        const optionButtons = Array.from(
            event.currentTarget.querySelectorAll<HTMLButtonElement>(
                '[role="option"]',
            ),
        );
        const currentIndex = optionButtons.indexOf(
            document.activeElement as HTMLButtonElement,
        );

        if (currentIndex === -1 || optionButtons.length === 0) {
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            focusOption(currentIndex + 1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            focusOption(currentIndex - 1);
        } else if (event.key === 'Home') {
            event.preventDefault();
            focusOption(0);
        } else if (event.key === 'End') {
            event.preventDefault();
            focusOption(-1);
        }
    }

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handlePointerDown(event: PointerEvent) {
            if (
                event.target instanceof Node &&
                !selectRef.current?.contains(event.target)
            ) {
                closeDropdown();
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                closeDropdown(true);
            }
        }

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        if (isSearchable) {
            searchInputRef.current?.focus();
        }

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, isSearchable]);

    return (
        <div ref={selectRef} className={styles.select}>
            <button
                ref={triggerRef}
                id={id}
                className={styles.trigger}
                type="button"
                role="combobox"
                aria-label={label}
                aria-expanded={isOpen}
                aria-controls={listboxId}
                aria-haspopup="listbox"
                disabled={disabled}
                onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
                onKeyDown={handleTriggerKeyDown}
            >
                <span>{selectedOption?.label ?? allOptionLabel}</span>
                <ChevronDown aria-hidden="true" />
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    {isSearchable && (
                        <div className={styles.searchField}>
                            <Search aria-hidden="true" />
                            <input
                                ref={searchInputRef}
                                className={styles.search}
                                type="search"
                                placeholder={`Search ${label.toLowerCase()}...`}
                                aria-label={`Search ${label.toLowerCase()}`}
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                onKeyDown={handleSearchKeyDown}
                            />
                        </div>
                    )}

                    <ul
                        id={listboxId}
                        className={styles.options}
                        role="listbox"
                        onKeyDown={handleOptionsKeyDown}
                    >
                        {allOptionLabel && (
                            <li>
                                <button
                                    className={styles.option}
                                    type="button"
                                    role="option"
                                    aria-selected={value === ''}
                                    onClick={() => handleSelect('')}
                                >
                                    {allOptionLabel}
                                </button>
                            </li>
                        )}

                        {filteredOptions.map((option) => (
                            <li key={option.value}>
                                <button
                                    className={styles.option}
                                    type="button"
                                    role="option"
                                    aria-selected={value === option.value}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}

                        {filteredOptions.length === 0 && (
                            <li className={styles.empty}>No options found.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchableSelect;
