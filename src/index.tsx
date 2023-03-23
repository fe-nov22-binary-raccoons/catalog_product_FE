import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';

import { CartProvider } from './components/CartProvider';

import { FavoritesProvider } from './components/FavoritesContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement,
);

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <CartProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </CartProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
);
