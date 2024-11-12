import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { ModuleRoutes } from './app/routes';
import Home from './app/pages/Home';
import Resumen from './app/pages/Resumen';
import Categories from './app/pages/Categories';
import ProductsPage from './app/pages/ProductPage/ProductsPage';
import Init from './app/pages/Init/Init';
import Login from './app/pages/Login/Login';

// import { useCart } from "./";

// import { PropsWithChildren, FC }from 'react';

// const PrivateRoute: FC<PropsWithChildren> = () => {
//   const user = {
//     id: 1000,
//   };

//   if (user.id === 100) {
//     console.log("render");
//     return <Outlet />;
//   }

//   return <Navigate to={`/${ModuleRoutes.Home}`} replace />;
// };

const App: React.FC = () => {
  return (
    <Routes>
      {/* Define las rutas */}
      <Route path={ModuleRoutes.Init} element={<Init />} />
      <Route path={ModuleRoutes.Home} element={<Home />} />
      <Route path={ModuleRoutes.Login} element={<Login />} />
      {/* Debería mostrar las categorias individuales*/}
      <Route
        path={`${ModuleRoutes.Categories}/:categoryName`}
              element={< Categories />}
      />
      <Route path={ModuleRoutes.Resumen} element={<Resumen />} />
      {/* <Route path={ModuleRoutes.ProductsPage} element={<ProductsPage />} /> */}
      <Route path="*" element={<Navigate to={ModuleRoutes.Init} replace />} />
    </Routes>
  );
};

export default App
