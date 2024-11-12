import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './App.css'

import { BrowserRouter } from 'react-router-dom';
import './assets/css/styles.css';
import App from './App.tsx'
import MainLayout from './Layout/MainLayout/MainLayout.tsx';
import { CartProvider } from './app/context/CartContext.tsx';

createRoot(document.getElementById('root')as HTMLElement).render(
  <StrictMode>
    <CartProvider>
    <BrowserRouter basename= "/">
    <MainLayout>
      <App />
    </MainLayout>
    </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)
