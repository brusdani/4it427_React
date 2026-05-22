import {createContext, useContext, useState, useEffect} from 'react';
import type {ReactNode} from 'react';
import type {Film} from '../types/film.types';

interface WatchlistContextType {
    films: Film[];
    addFilm: (filmData: Omit<Film, 'id' | 'watched'>) => void;
    removeFilm: (id: string) => void;
    toggleWatched: (id: string) => void;
    markAllAsWatched: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

const initialFilms: Film[] = [
    {id: "1", title: "Inception", year: 2010, genre: "Sci-Fi / Thriller", rating: 9, watched: true},
    {id: "2", title: "The Godfather", year: 1972, genre: "Krimi / Drama", rating: 12, watched: false},
    {id: "3", title: "Pulp Fiction", year: 1994, genre: "Krimi", rating: 9, watched: true}
];

interface WatchlistProviderProps {
    children: ReactNode;
}

export function WatchlistProvider({children}: WatchlistProviderProps) {
    const [films, setFilms] = useState<Film[]>(initialFilms);


    const addFilm = (filmData: Omit<Film, 'id' | 'watched'>) => {
        const newFilm: Film = {
            id: crypto.randomUUID(),
            ...filmData,
            watched: false,
        };

        setFilms((prev) => [...prev, newFilm]);
    };

    const removeFilm = (id: string) => {
        setFilms((prev) => prev.filter((film) => film.id !== id));
    };

    const toggleWatched = (id: string) => {
        setFilms((prev) =>
            prev.map((film) =>
                film.id === id ? {...film, watched: !film.watched} : film
            )
        );
    };
    const markAllAsWatched = () => {
        setFilms((prev) => prev.map((film) => ({...film, watched: true})));
    };
    useEffect(() => {
        const watchedCount = films.filter((film) => film.watched).length;
        const totalCount = films.length;

        document.title = `Watchlist (${watchedCount} / ${totalCount} zhlédnuto)`;
    }, [films]);

    return (
        <WatchlistContext.Provider
            value={{
                films,
                addFilm,
                removeFilm,
                toggleWatched,
                markAllAsWatched,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    );
}
export function useWatchlist() {
    const context = useContext(WatchlistContext);

    if (context === undefined) {
        throw new Error('useWatchlist must be used within WatchlistProvider');
    }

    return context;
}