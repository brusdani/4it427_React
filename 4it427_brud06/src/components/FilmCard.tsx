interface FilmCardProps {
    title: string,
    year: number,
    genre: string,
    rating: number,
    watched: boolean,
    onToggleWatched: (title: string) => void;
}

export function FilmCard({
                             title,
                             year,
                             genre,
                             rating,
                             watched,
                             onToggleWatched,
                         }: FilmCardProps) {

    const isRatingValid = rating >= 1 && rating <= 10;

    return (
        <div style={{ border: '1px solid #ddd', padding: '16px', marginBottom: '16px', borderRadius: '8px' }}>
            <h2>{title}</h2>

            <p><strong>Rok vydání:</strong> {year}</p>
            <p><strong>Žánr:</strong> {genre}</p>

            <p>
                <strong>Hodnocení:</strong> {isRatingValid ? `${rating}/10` : <span style={{ color: 'red' }}>Neplatné hodnocení</span>}
            </p>

            {watched && (
                <p style={{ color: 'green', fontWeight: 'bold', margin: '8px 0' }}>
                    ✓ Zhlédnuto
                </p>
            )}

            <button
                onClick={() => onToggleWatched(title)}
                style={{ padding: '8px 12px', cursor: 'pointer', marginTop: '8px' }}
            >
                Změnit stav zhlédnutí
            </button>
        </div>
    );
}