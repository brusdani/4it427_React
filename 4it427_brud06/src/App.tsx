import './App.css'
import { FilmCard } from './components/FilmCard'
import { useWatchlist } from './hooks/useWatchlist';

const mockFilms = [
    {
        title: "Inception",
        year: 2010,
        genre: "Sci-Fi / Thriller",
        rating: 9,
        watched: true,
    },
    {
        title: "The Godfather)",
        year: 1972,
        genre: "Krimi / Drama",
        rating: 12,
        watched: false,
    },
    {
        title: "Pulp Fiction",
        year: 1994,
        genre: "Krimi",
        rating: 9,
        watched: true,
    }
];

function App() {
    const { films, toggleWatched, markAllAsWatched } = useWatchlist(mockFilms);
    return (
        <div>
            <h1>Film Watchlist</h1>

            <button onClick={markAllAsWatched}>
                Označit vše jako zhlédnuté
            </button>

            <div>
                {films.map((film) => (
                    <FilmCard
                        key={film.title}
                        {...film}
                        onToggleWatched={toggleWatched}
                    />
                ))}
            </div>
        </div>
    );
}

export default App