import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { AccessoriesPage } from './components/AccessoriesPage';
import { FavoritesPage } from './components/FavoritesPage';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
// import { PhonesPage } from './components/PhonesPage/PhonesPage';
// import { Phones } from './pages/phones-page';
import { TabletsPage } from './components/TabletsPage';

export const App: React.FC = () => {
  return <div className="App">
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
      <Route path="bag" element={<AccessoriesPage />} />
    </Routes>
  </div>;
};
