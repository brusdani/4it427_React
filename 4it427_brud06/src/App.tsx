/* Stylingová metoda: CSS Modules */

import styles from './App.module.css';
import { FilmCard } from './components/FilmCard';
import { useWatchlist } from './context/WatchlistContext';
import { AddFilmForm } from './components/AddFilmForm';
import { useState } from 'react';

function App() {
    const { films, toggleWatched, markAllAsWatched, removeFilm } = useWatchlist();
    const watchedCount = films.filter((film) => film.watched).length;
    const totalCount = films.length;
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        setIsDarkMode((currentValue) => !currentValue);
    };

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <button
                    type="button"
                    className={styles.themeButton}
                    onClick={toggleTheme}
                >
                    {isDarkMode ? 'Světlý režim' : 'Tmavý režim'}
                </button>
                <h1 className={styles.title}>Film Watchlist</h1>

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
            </header>

            <AddFilmForm />

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
        </div>
    );
}

export default App;