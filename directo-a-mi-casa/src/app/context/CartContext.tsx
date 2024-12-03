import React, { createContext, useReducer, ReactNode, useContext, useEffect } from 'react';
import { CartState, initialState, cartReducer } from './CartReducer';
import { Product } from '../domain/Product';
import { Action } from '../domain/cartActions.types';
import { toast } from "react-toastify";

export interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<Action>;
  addProduct: (product: Product) => void;
  getProductById: (productId: number | string) => Product | undefined;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());

  function loadInitialState(): CartState {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : initialState;
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addProduct = (newProduct: Product) => {
    if (!newProduct || !newProduct.id) {
      console.error("Producto inválido:", newProduct);
      return;
    }

    const existingProduct = getProductById(newProduct.id);
    if (existingProduct) {
      toast.info("Este producto ya está en tu carrito.");
      return;
    }

    dispatch({ type: "ADD_PRODUCT", product: newProduct });
    toast.success(`${newProduct.title} se agregó al carrito.`);
  };

  /**
   * Obtiene un producto del carrito por su ID.
   * @param productId - ID del producto a buscar.
   * @returns El producto encontrado o undefined si no existe.
   */
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
};

/**
 * Hook para acceder al contexto del carrito.
 * Lanza un error si se usa fuera de un CartProvider.
 */
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }

  return context;
};
