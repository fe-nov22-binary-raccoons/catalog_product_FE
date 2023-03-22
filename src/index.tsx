import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import { CartProvider } from './components/CartProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement,
);

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
);
