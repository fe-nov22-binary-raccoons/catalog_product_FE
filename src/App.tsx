/* eslint-disable max-len */
import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
// import 'bulma/css/bulma.min.css';

import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';

import { TabletsPage } from './pages/TabletsPage';
import { BagPage } from './pages/BagPage';
import { MenuPage } from './pages/MenuPage';
// import { TabletsPage } from './pages/TabletsPage';
import { Footer } from './components/Footer';
import { PageNotFound } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import { ThemeContext } from './components/ThemeProvider/ThemeProvider';
// import { DarkModeSwitch } from 'react-toggle-dark-mode';
// import { BannerSwiper } from './components/BannerSwiper';
import { Contacts } from './pages/Contacts';
import { Rights } from './pages/Rights';
import { TabletsPage } from './pages/TabletsPage';


export const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const addThemeAttribute = () => {
    document.querySelector('body')?.setAttribute('data-theme', theme);
  };

  addThemeAttribute();

  return (
    <div className="flex-wrapper">
      <Header />

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
          <Route path="cart" element={<AccessoriesPage />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="rights" element={<Rights />} />
          <Route path="bag" element={<BagPage />} />
          <Route path="menu" element={<MenuPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
