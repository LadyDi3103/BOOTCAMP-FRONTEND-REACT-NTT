import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { ModuleRoutes } from './app/routes/routes';
import ProductsPage from './app/pages/ProductPage/ProductsPage';
import Init from './app/pages/Init/Init';
import Login from './app/pages/Login/Login';
import ResumenPage from './app/pages/Resumen/ResumenPage';
import Home from './app/pages/Home/Home';
import MarketPage from './app/pages/MarketPage/MarketPage';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path={ModuleRoutes.Login} element={<Login />} />
      <Route path={ModuleRoutes.Home} element={<Home />} />

      <Route path={ModuleRoutes.MarketPage} element={ <MarketPage />} />
      <Route path={ModuleRoutes.Init} element={<Init />} />
      <Route path={`${ModuleRoutes.ProductsPage}/:productId`} element={<ProductsPage />} />
      <Route path={ModuleRoutes.Resumen} element={<ResumenPage />} />


      <Route path="*" element={<Navigate to={ModuleRoutes.Home} replace />} />
    </Routes>
  );
};

export default App;