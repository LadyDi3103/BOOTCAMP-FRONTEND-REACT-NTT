import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { ModuleRoutes } from './app/routes';
// import Home from './app/pages/Home';
import Resumen from './app/pages/Resumen/ResumenPage';
import Categories from './app/pages/Categories/Categories';
import ProductsPage from './app/pages/ProductPage/ProductsPage';
import Init from './app/pages/Init/Init';
import Login from './app/pages/Login/Login';


const App: React.FC = () => {
  return (
    <Routes>
      {/* Define las rutas */}
      {/* <Route path={ModuleRoutes.Home} element={<Home />} /> */}
      {/* <Route path={ModuleRoutes.HomePage} element={<Home />} /> */}
      <Route path={ModuleRoutes.Init} element={<Init />} />
      <Route path={ModuleRoutes.Login} element={<Login />} />
      <Route path={`${ModuleRoutes.ProductsPage}/:productId`} element={<ProductsPage />} />
      <Route path={`${ModuleRoutes.Categories}/:categoryName`} element={<Categories />} />
      <Route path={ModuleRoutes.Resumen} element={<Resumen />} />
      {/* <Route path="*" element={<Navigate to={ModuleRoutes.HomePage} replace />} /> */}
    </Routes>
  );
};

export default App
