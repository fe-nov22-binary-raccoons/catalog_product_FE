/* eslint-disable max-len */
import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { Footer } from './components/Footer';
import { PageNotFound } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import { ThemeContext } from './test/ThemeProvider';
// import { DarkModeSwitch } from 'react-toggle-dark-mode';

export const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const lpo = () => {
    document.querySelector('body')?.setAttribute('data-theme', theme);
  };

  lpo();

  return (
    <div className="flex-wrapper" id={theme}>
      <Header />

      {/* <DarkModeSwitch
        style={{ marginBottom: '2rem', backgroundColor: '#F86800', borderRadius: '50%', padding: '2px' }}
        checked={theme === 'light'}
        onChange={toggleTheme}
        size={30}
      /> */}

      <main className="page-bg">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="products">
            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":phoneId" element={<ProductPage />} />
            </Route>
            <Route path="tablets" element={<TabletsPage />} />
            <Route path="accessories" element={<AccessoriesPage />} />
          </Route>
          {/* <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":phoneId" element={<ItemCardPage />} />
          </Route>
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} /> */}
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<AccessoriesPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
