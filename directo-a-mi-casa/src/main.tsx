import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './App.css'
import { BrowserRouter } from 'react-router-dom';
import './assets/css/styles.css';
import App from './App.tsx'
import { CartProvider } from './app/context/CartContext';
import { ProductProvider } from './app/context/ProductContext.tsx';
import Footer from './Layout/Footer/Footer.tsx';
import Header from './Layout/Header/Header.tsx';


createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
        <BrowserRouter basename="/">
        <Header />
            <App />
            <Footer />
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  </StrictMode>,
)
