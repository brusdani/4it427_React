import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { Film } from '../types/film.types';
import { fetchFilms } from '../api/films';

interface WatchlistContextType {
    films: Film[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    refetchFilms: () => void;
    addFilm: (filmData: Omit<Film, 'id' | 'watched'>) => void;
    removeFilm: (id: string) => void;
    toggleWatched: (id: string) => void;
    markAllAsWatched: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

interface WatchlistProviderProps {
    children: ReactNode;
}

export function WatchlistProvider({ children }: WatchlistProviderProps) {
    const [addedFilms, setAddedFilms] = useState<Film[]>([]);
    const [removedFilmIds, setRemovedFilmIds] = useState<string[]>([]);
    const [watchedOverrides, setWatchedOverrides] = useState<Record<string, boolean>>({});

    const {
        data: fetchedFilms = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['films'],
        queryFn: fetchFilms,
    });

    const films = useMemo(() => {
        const allFilms = [...fetchedFilms, ...addedFilms];

        return allFilms
            .filter((film) => !removedFilmIds.includes(film.id))
            .map((film) => ({
                ...film,
                watched: watchedOverrides[film.id] ?? film.watched,
            }));
    }, [fetchedFilms, addedFilms, removedFilmIds, watchedOverrides]);

    const addFilm = (filmData: Omit<Film, 'id' | 'watched'>) => {
        const newFilm: Film = {
            id: Date.now().toString(),
            ...filmData,
            watched: false,
        };

        setAddedFilms((prev) => [...prev, newFilm]);
    };

    const removeFilm = (id: string) => {
        setRemovedFilmIds((prev) => [...prev, id]);
    };

    const toggleWatched = (id: string) => {
        const film = films.find((film) => film.id === id);

        if (!film) {
            return;
        }

        setWatchedOverrides((prev) => ({
            ...prev,
            [id]: !film.watched,
        }));
    };

    const markAllAsWatched = () => {
        const newWatchedOverrides = films.reduce<Record<string, boolean>>((acc, film) => {
            acc[film.id] = true;
            return acc;
        }, {});

        setWatchedOverrides((prev) => ({
            ...prev,
            ...newWatchedOverrides,
        }));
    };

    useEffect(() => {
        const watchedCount = films.filter((film) => film.watched).length;
        const totalCount = films.length;

        document.title = `Watchlist (${watchedCount} / ${totalCount} zhlédnuto)`;
    }, [films]);

    const refetchFilms = () => {
        void refetch();
    };

    return (
        <WatchlistContext.Provider
            value={{
                films,
                isLoading,
                isError,
                error,
                refetchFilms,
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