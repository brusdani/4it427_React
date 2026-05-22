import styles from '../App.module.css';
import { FilmCard } from '../components/FilmCard';
import { useWatchlist } from '../context/WatchlistContext';

export function WatchlistPage() {
    const {
        films,
        isLoading,
        isError,
        error,
        refetchFilms,
        toggleWatched,
        markAllAsWatched,
        removeFilm,
    } = useWatchlist();

    if (isLoading) {
        return <p className={styles.counter}>Načítám…</p>;
    }

    if (isError) {
        return (
            <div className={styles.headerActions}>
                <p className={styles.counter}>
                    {error?.message ?? 'Filmy se nepodařilo načíst.'}
                </p>

                <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={refetchFilms}
                >
                    Zkusit znovu
                </button>
            </div>
        );
    }

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