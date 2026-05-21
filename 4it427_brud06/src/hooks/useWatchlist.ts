import { useState, useEffect } from 'react';

export type Film = {
    title: string;
    year: number;
    genre: string;
    rating: number;
    watched: boolean;
};

export function useWatchlist(initialFilms: Film[]) {
    const [films, setFilms] = useState<Film[]>(initialFilms);

    const toggleWatched = (title: string) => {
        setFilms((prev) =>
            prev.map((film) =>
                film.title === title ? { ...film, watched: !film.watched } : film
            )
        );
    };

    const markAllAsWatched = () => {
        setFilms((prev) => prev.map((film) => ({ ...film, watched: true })));
    };

    useEffect(() => {
        const watchedCount = films.filter((f) => f.watched).length;
        const totalCount = films.length;
        document.title = `Watchlist (${watchedCount} / ${totalCount} zhlédnuto)`;
    }, [films]);

    return { films, toggleWatched, markAllAsWatched };
}