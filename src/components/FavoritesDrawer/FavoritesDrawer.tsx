import {
    useEffect,
    useRef,
    useState,
    type ReactNode,
    type RefObject,
} from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import styles from './FavoritesDrawer.module.css';

interface IFavoritesDrawerProps {
    isOpen: boolean;
    triggerRef: RefObject<HTMLButtonElement | null>;
    onClose: () => void;
    children: ReactNode;
}

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');

function FavoritesDrawer({
    isOpen,
    triggerRef,
    onClose,
    children,
}: IFavoritesDrawerProps) {
    const drawerRef = useRef<HTMLElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const updateViewport = () => setIsMobile(mediaQuery.matches);

        updateViewport();
        mediaQuery.addEventListener('change', updateViewport);

        return () => mediaQuery.removeEventListener('change', updateViewport);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        const triggerElement = triggerRef.current;
        document.body.style.overflow = 'hidden';

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusableElements =
                drawerRef.current?.querySelectorAll<HTMLElement>(
                    FOCUSABLE_SELECTOR,
                );

            if (!focusableElements?.length) {
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (!drawerRef.current?.contains(document.activeElement)) {
                event.preventDefault();
                (event.shiftKey ? lastElement : firstElement).focus();
                return;
            }

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === lastElement
            ) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        const focusFrame = window.requestAnimationFrame(() => {
            closeButtonRef.current?.focus();
        });

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
            triggerElement?.focus();
        };
    }, [isOpen, onClose, triggerRef]);

    const drawerMotion = isMobile
        ? { initial: { opacity: 0, y: '100%' }, animate: { opacity: 1, y: 0 } }
        : { initial: { opacity: 0, x: '100%' }, animate: { opacity: 1, x: 0 } };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.layer}>
                    <motion.button
                        className={styles.backdrop}
                        type="button"
                        aria-label="Close favorites"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        onClick={onClose}
                    />

                    <motion.aside
                        ref={drawerRef}
                        id="favorites-drawer"
                        className={styles.drawer}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="favorites-drawer-title"
                        initial={drawerMotion.initial}
                        animate={drawerMotion.animate}
                        exit={drawerMotion.initial}
                        transition={{
                            type: 'spring',
                            stiffness: 360,
                            damping: 34,
                        }}
                    >
                        <div className={styles.drawerHeader}>
                            <div>
                                <p className={styles.eyebrow}>Saved dogs</p>
                                <h2 id="favorites-drawer-title">Favorites</h2>
                            </div>

                            <button
                                ref={closeButtonRef}
                                className={styles.closeButton}
                                type="button"
                                aria-label="Close favorites"
                                title="Close favorites"
                                onClick={onClose}
                            >
                                <X aria-hidden="true" />
                            </button>
                        </div>

                        <div className={styles.drawerContent}>{children}</div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
}

export default FavoritesDrawer;
