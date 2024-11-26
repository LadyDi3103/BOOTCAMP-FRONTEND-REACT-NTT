// no c'odigo comentado
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { ModuleRoutes } from './app/routes';

import ProductsPage from './app/pages/ProductPage/ProductsPage';
import Init from './app/pages/Init/Init';
import Login from './app/pages/Login/Login';
import ResumenPage from './app/pages/Resumen/ResumenPage';
import Home from './app/pages/Home/Home';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Define las rutas */}
      <Route path={ModuleRoutes.Login} element={<Login />} />
      <Route path={ModuleRoutes.Home} element={<Home />} />
      <Route path={ModuleRoutes.Init} element={<Init />} />
      <Route path={`${ModuleRoutes.ProductsPage}/:productId`} element={<ProductsPage />} />
      {/* <Route path={`${ModuleRoutes.CategoriesPage}/:categoryName`} element={<CategoriesPage />} /> */}
      {/* <Route path="/search" element={<SearchPage />} /> */}
      <Route path={ModuleRoutes.Resumen} element={<ResumenPage />} />
      {/* Redirección a la ruta principal si no se encuentra */}
      <Route path="*" element={<Navigate to={ModuleRoutes.Home} replace />} />
    </Routes>
  );
};

export default App;
