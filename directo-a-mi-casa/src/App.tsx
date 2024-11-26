import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Estilos globales de la aplicación
import './App.css';

// Importación de rutas
import { ModuleRoutes } from './app/routes';

// Importación de páginas
import ProductsPage from './app/pages/ProductPage/ProductsPage';
import Init from './app/pages/Init/Init';
import Login from './app/pages/Login/Login';
import ResumenPage from './app/pages/Resumen/ResumenPage';
import Home from './app/pages/Home/Home';

/**
 * Componente principal que define el sistema de enrutamiento de la aplicación.
 */
const App: React.FC = () => {
  return (
    <Routes>
      {/* Página de inicio de sesión */}
      <Route path={ModuleRoutes.Login} element={<Login />} />

      {/* Página principal (Home) */}
      <Route path={ModuleRoutes.Home} element={<Home />} />

      {/* Página de inicio inicial */}
      <Route path={ModuleRoutes.Init} element={<Init />} />

      {/* Página de productos (con ID dinámico en la URL) */}
      <Route path={`${ModuleRoutes.ProductsPage}/:productId`} element={<ProductsPage />} />

      {/* Página de resumen del carrito */}
      <Route path={ModuleRoutes.Resumen} element={<ResumenPage />} />

      {/* Redirección para rutas no encontradas */}
      <Route path="*" element={<Navigate to={ModuleRoutes.Home} replace />} />
    </Routes>
  );
};

export default App;
