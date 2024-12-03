import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import './assets/css/styles.css';

import App from './App.tsx';
import { CartProvider } from './app/context/CartContext';
import { ProductProvider } from './app/context/ProductContext.tsx';
import Footer from './Layout/Footer/Footer.tsx';
import Header from './Layout/Header/Header.tsx';
import { AuthProvider } from './app/context/AuthContext.tsx';
import './assets/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <Header />
            <App />
            <Footer />

          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
