import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { CartState, Action, initialState, cartReducer } from './CartReducer';
import { Product } from '../domain/Product';

export interface CartContextProps {
    state: CartState,
    dispatch: React.Dispatch<Action>,
    addProduct: (product: Product) => void;
  }
  
  export const CartContext = createContext<CartContextProps | undefined>(undefined);
  // Proveedor del contexto del carrito
  export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Función para agregar productos al carrito
  const addProduct = (newProduct: Product) => {
    dispatch({ type: "ADD_PRODUCT", product: newProduct });
  };

    return (
        <CartContext.Provider value={{ state, dispatch, addProduct}}>
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