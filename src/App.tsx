/* eslint-disable max-len */
import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';

import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';

import { CartPage } from './pages/CartPage';
import { MenuPage } from './pages/MenuPage';
import { Footer } from './components/Footer';
import { PageNotFound } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import { ThemeContext } from './components/ThemeProvider/ThemeProvider';
import { Contacts } from './pages/Contacts';
import { Rights } from './pages/Rights';
import { TabletsPage } from './pages/TabletsPage';
import { ActivationPage } from './pages/ActivationPage';

export const App: React.FC = () => {
  const location = useLocation();

  const { theme } = useContext(ThemeContext);

  const addThemeAttribute = () => {
    document.querySelector('body')?.setAttribute('data-theme', theme);
  };

  addThemeAttribute();

  return (
    <div className="flex-wrapper">
      {location.pathname !== '/activation' && <Header />}

      <main className="page-bg">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          {/* <Route path="products">
            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":phoneId" element={<ProductPage />} />
            </Route>
            <Route path="tablets" element={<BannerSwiper />} />
            <Route path="accessories" element={<AccessoriesPage />} />
          </Route> */}
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":phoneId" element={<ProductPage />} />
          </Route>
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="rights" element={<Rights />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="activation/:activationToken" element={<ActivationPage />} />
        </Routes>
      </main>

      {location.pathname !== '/activation' && <Footer />}
    </div>
  );
};
