import styles from '../App.module.css';
import { FilmCard } from '../components/FilmCard';
import { useWatchlist } from '../context/WatchlistContext';

export function WatchlistPage() {
    const { films, toggleWatched, markAllAsWatched, removeFilm } = useWatchlist();

    const watchedCount = films.filter((film) => film.watched).length;
    const totalCount = films.length;

    return (
        <>
            <div className={styles.headerActions}>
                <p className={styles.counter}>
                    {watchedCount} / {totalCount} zhlédnuto
                </p>

                <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={markAllAsWatched}
                >
                    Označit vše jako zhlédnuté
                </button>
            </div>

            <main className={styles.grid}>
                {films.map((film) => (
                    <FilmCard
                        key={film.id}
                        {...film}
                        onToggleWatched={toggleWatched}
                        onRemove={removeFilm}
                    />
                ))}
            </main>
        </>
    );
}