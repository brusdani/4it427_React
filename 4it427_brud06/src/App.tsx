/* Stylingová metoda: CSS Modules */

import { useState } from 'react';
import styles from './App.module.css';
import { Navigate, Route, Routes, NavLink } from 'react-router-dom';
import { WatchlistPage } from './pages/WatchlistPage';
import {AddFilmPage} from "./pages/AddFilmPage.tsx";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        setIsDarkMode((currentValue) => !currentValue);
    };

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <button
                    type="button"
                    className={styles.themeButton}
                    onClick={toggleTheme}
                >
                    {isDarkMode ? 'Světlý režim' : 'Tmavý režim'}
                </button>

                <h1 className={styles.title}>Film Watchlist</h1>
                <nav className={styles.nav}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                        }
                    >
                        Můj watchlist
                    </NavLink>

                    <NavLink
                        to="/form"
                        className={({ isActive }) =>
                            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                        }
                    >
                        Přidat film
                    </NavLink>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<WatchlistPage />} />
                <Route path="/form" element={<AddFilmPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

        </div>
    );
}

export default App;