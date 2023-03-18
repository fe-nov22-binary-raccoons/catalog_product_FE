import React from 'react';
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

export const App: React.FC = () => {
  return (
    <div className="flex-wrapper">
      <Header />

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
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<AccessoriesPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
