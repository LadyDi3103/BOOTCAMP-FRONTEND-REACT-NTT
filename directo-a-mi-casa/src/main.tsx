import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Estilos globales
import './assets/css/styles.css';

// Componentes principales
import App from './App.tsx';
import { CartProvider } from './app/context/CartContext';
import { ProductProvider } from './app/context/ProductContext.tsx';
import Footer from './Layout/Footer/Footer.tsx';
import Header from './Layout/Header/Header.tsx';

/**
 * Punto de entrada principal de la aplicación.
 * Renderiza el árbol completo de componentes dentro del contexto de React.
 */
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    {/* Proveedor de productos */}
    <ProductProvider>
      {/* Proveedor del carrito de compras */}
      <CartProvider>
        {/* Configuración de enrutamiento */}
        <BrowserRouter basename="/">
          {/* Cabecera de la aplicación */}
          <Header />
          
          {/* Componente principal */}
          <App />
          
          {/* Pie de página */}
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  </StrictMode>,
);
