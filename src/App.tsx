import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
// import 'bulma/css/bulma.min.css';

import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
// import { Footer } from './components/Footer';
import { BagPage } from './pages/BagPage';
import { MenuPage } from './pages/MenuPage';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
        </Route>
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="bag" element={<BagPage />} />
        <Route path="menu" element={<MenuPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};
