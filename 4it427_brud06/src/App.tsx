import './App.css'
import { FilmCard } from './components/FilmCard'
import { useWatchlist } from './context/WatchlistContext';
import { AddFilmForm } from './components/AddFilmForm';

function App() {
    const { films, toggleWatched, markAllAsWatched, removeFilm } = useWatchlist();
    const watchedCount = films.filter((film) => film.watched).length;
    const totalCount = films.length;

    return (
        <div>
            <h1>Film Watchlist</h1>

            <p>
                {watchedCount} / {totalCount} zhlédnuto
            </p>

            <button onClick={markAllAsWatched}>
                Označit vše jako zhlédnuté
            </button>

            <AddFilmForm />

            <div>
                {films.map((film) => (
                    <FilmCard
                        key={film.id}
                        {...film}
                        onToggleWatched={toggleWatched}
                        onRemove={removeFilm}
                    />
                ))}
            </div>
        </div>
    );
}

export default App