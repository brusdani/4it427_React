import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WatchlistProvider } from './context/WatchlistContext'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <WatchlistProvider>
              <App />
          </WatchlistProvider>
      </BrowserRouter>
  </StrictMode>,
)
