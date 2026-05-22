//comment to fix commit message
interface FilmCardProps {
    id: string;
    title: string,
    year: number,
    genre: string,
    rating: number,
    watched: boolean,
    onToggleWatched: (id: string) => void,
    onRemove: (id: string) => void;
}

export function FilmCard({   id,
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
                onClick={() => onToggleWatched(id)}
                style={{ padding: '8px 12px', cursor: 'pointer', marginTop: '8px' }}
            >
                Změnit stav zhlédnutí
            </button>
            <button
                onClick={() => onRemove(id)}
                style={{ padding: '8px 12px', cursor: 'pointer', marginTop: '8px', marginLeft: '8px' }}
            >
                Odebrat
            </button>
        </div>
    );
}