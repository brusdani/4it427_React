import { useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext';

export function AddFilmForm() {
    const { addFilm } = useWatchlist();
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        addFilm({
            title,
            year: Number(year),
            genre,
            rating: Number(rating),
        });

        setTitle('');
        setYear('');
        setGenre('');
        setRating('');
    };
    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
            <div>
                <label>
                    Název filmu:
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Rok:
                    <input
                        type="number"
                        value={year}
                        onChange={(event) => setYear(event.target.value)}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Žánr:
                    <input
                        type="text"
                        value={genre}
                        onChange={(event) => setGenre(event.target.value)}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Hodnocení:
                    <input
                        type="number"
                        value={rating}
                        onChange={(event) => setRating(event.target.value)}
                        min="1"
                        max="10"
                        required
                    />
                </label>
            </div>

            <button type="submit" style={{ marginTop: '8px' }}>
                Přidat film
            </button>
        </form>
    );
}