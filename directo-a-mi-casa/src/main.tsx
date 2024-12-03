// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './assets/css/styles.css';

import App from './App.tsx';
import { CartProvider } from './app/context/CartContext';
import { ProductProvider } from './app/context/ProductContext.tsx';
import { AuthProvider } from './app/context/AuthContext.tsx';
import './assets/css/styles.css';
import MainLayout from './Layout/MainLayout/MainLayout.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  // <StrictMode>

      <BrowserRouter basename="/">
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <MainLayout>
            <App />
            </MainLayout>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>

  // </StrictMode>,
);
