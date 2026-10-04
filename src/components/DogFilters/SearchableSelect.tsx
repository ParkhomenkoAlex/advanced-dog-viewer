import { useEffect, useRef, useState } from 'react';
import styles from './SearchableSelect.module.css';

export interface SearchableSelectOption {
    value: string;
    label: string;
}

interface SearchableSelectProps {
    id: string;
    label: string;
    value: string;
    options: SearchableSelectOption[];
    allOptionLabel: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

function SearchableSelect({
    id,
    label,
    value,
    options,
    allOptionLabel,
    disabled = false,
    onChange,
}: SearchableSelectProps) {
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

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handlePointerDown(event: PointerEvent) {
            if (!selectRef.current?.contains(event.target as Node)) {
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
        searchInputRef.current?.focus();

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div ref={selectRef} className={styles.select}>
            <button
                ref={triggerRef}
                id={id}
                className={styles.trigger}
                type="button"
                role="combobox"
                aria-expanded={isOpen}
                aria-controls={listboxId}
                aria-haspopup="listbox"
                disabled={disabled}
                onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
            >
                <span>{selectedOption?.label ?? allOptionLabel}</span>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m4 6 4 4 4-4" />
                </svg>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <input
                        ref={searchInputRef}
                        className={styles.search}
                        type="search"
                        placeholder={`Search ${label.toLowerCase()}...`}
                        aria-label={`Search ${label.toLowerCase()}`}
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />

                    <ul
                        id={listboxId}
                        className={styles.options}
                        role="listbox"
                    >
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
