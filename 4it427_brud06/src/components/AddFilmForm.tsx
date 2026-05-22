import { useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import { useNavigate } from 'react-router-dom';
import styles from './AddFilmForm.module.css';

export function AddFilmForm() {
    const { addFilm } = useWatchlist();
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const clearSuccessMessage = () => {
        if (successMessage) {
            setSuccessMessage('');
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        addFilm({
            title,
            year: Number(year),
            genre,
            rating: Number(rating),
        });

        setSuccessMessage(`Film ${title} byl přidán do watchlistu.`);

        setTitle('');
        setYear('');
        setGenre('');
        setRating('');

        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Přidat film</h2>

            {successMessage && (
                <p className={styles.successMessage}>{successMessage}</p>
            )}

            <div className={styles.fields}>
                <label className={styles.field}>
                    <span className={styles.label}>Název filmu</span>
                    <input
                        className={styles.input}
                        type="text"
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                            clearSuccessMessage();
                        }}
                        required
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Rok</span>
                    <input
                        className={styles.input}
                        type="number"
                        value={year}
                        onChange={(event) => setYear(event.target.value)}
                        required
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Žánr</span>
                    <input
                        className={styles.input}
                        type="text"
                        value={genre}
                        onChange={(event) => setGenre(event.target.value)}
                        required
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Hodnocení</span>
                    <input
                        className={styles.input}
                        type="number"
                        value={rating}
                        onChange={(event) => setRating(event.target.value)}
                        min="1"
                        max="10"
                        required
                    />
                </label>
            </div>

            <button type="submit" className={styles.submitButton}>
                Přidat film
            </button>
        </form>
    );
}