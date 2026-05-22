import styles from './FilmCard.module.css';

interface FilmCardProps {
    id: string;
    title: string;
    year: number;
    genre: string;
    rating: number;
    watched: boolean;
    onToggleWatched: (id: string) => void;
    onRemove: (id: string) => void;
}

export function FilmCard({
                             id,
                             title,
                             year,
                             genre,
                             rating,
                             watched,
                             onToggleWatched,
                             onRemove,
                         }: FilmCardProps) {
    const isRatingValid = rating >= 1 && rating <= 10;

    return (
        <article className={`${styles.card} ${watched ? styles.watchedCard : ''}`}>
            <h2 className={styles.title}>{title}</h2>

            <p className={styles.info}>
                <strong>Rok vydání:</strong> {year}
            </p>

            <p className={styles.info}>
                <strong>Žánr:</strong> {genre}
            </p>

            <p className={styles.info}>
                <strong>Hodnocení:</strong>{' '}
                {isRatingValid ? (
                    `${rating}/10`
                ) : (
                    <span className={styles.invalidRating}>Neplatné hodnocení</span>
                )}
            </p>

            {watched && <p className={styles.watchedBadge}>✓ Zhlédnuto</p>}

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => onToggleWatched(id)}
                >
                    Změnit stav zhlédnutí
                </button>

                <button
                    type="button"
                    className={styles.dangerButton}
                    onClick={() => onRemove(id)}
                >
                    Odebrat
                </button>
            </div>
        </article>
    );
}