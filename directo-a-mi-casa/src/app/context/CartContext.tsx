import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { CartState, initialState, cartReducer } from './CartReducer';
import { Product } from '../domain/Product';
import { Action } from '../domain/cartActions.types';
export interface CartContextProps {
    state: CartState,
    dispatch: React.Dispatch<Action>,
    addProduct: (product: Product) => void;
    getProductById: (productId: number | string) => Product | undefined;
  }
  
  export const CartContext = createContext<CartContextProps | undefined>(undefined);
  // Proveedor del contexto del carrito
  export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Función para agregar productos al carrito
    const addProduct = (newProduct: Product) => {
      if (!newProduct || !newProduct.id) {
        console.error("Producto inválido:", newProduct);
        return;
      }
      
      
    dispatch({ type: "ADD_PRODUCT", product: newProduct });
  };

  const getProductById = (productId: number | string): Product | undefined => {
    return state.products.find((product) => product.id === productId);
  };

    return (
        <CartContext.Provider 
        value={{ 
          state, 
          dispatch, 
          addProduct,
          getProductById
          }}
          >
          {children}
        </CartContext.Provider>
      );
}

// Hook para acceder al contexto del carrito
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }

  return context;
};

