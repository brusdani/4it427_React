import { useState, useEffect } from 'react';
import type { Film } from '../types/film.types';



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