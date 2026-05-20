import './App.css'
import { FilmCard } from './components/FilmCard'

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
    const handleToggleWatched = (title: string) => {
        console.log(`Kliknuto na změnu stavu zhlédnutí u filmu: ${title}`);
    };
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Film Watchlist</h1>

            <div>
                {mockFilms.map((film, index) => (
                    <FilmCard
                        key={index}
                        title={film.title}
                        year={film.year}
                        genre={film.genre}
                        rating={film.rating}
                        watched={film.watched}
                        onToggleWatched={handleToggleWatched}
                    />
                ))}
            </div>
        </div>
    )
}

export default App