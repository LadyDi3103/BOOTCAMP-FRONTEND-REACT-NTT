import { Product } from "../domain/Product";
import { Action } from '../domain/cartActions.types';

export interface CartState {
  products: Product[];
  selectedProduct: Product | null;
}

export const initialState: CartState = {
  products: [],
  selectedProduct: null,
};

/**
 * Reducer para manejar las acciones relacionadas con el carrito.
 * @param state - El estado actual del carrito.
 * @param action - La acción que se va a procesar.
 * @returns El nuevo estado del carrito.
 */
export const cartReducer = (state: CartState, action: Action): CartState => {

  switch (action.type) {

    case "ADD_PRODUCT": {
      const existingProduct = state.products.find(
        (product) => product.id === action.product.id
      );

      if (existingProduct) {
        return {
          ...state
        };
      }

      return {
        ...state,
        products: [...state.products, { ...action.product, quantity: 1 }],
      };
    }

    case "REMOVE_PRODUCT": {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.productId
        ),
      };
    }

    case "INCREMENT_QUANTITY": {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.productId
            ? { ...product, quantity: (product.quantity || 1) + 1 }
            : product
        ),
      };
    }

    case "DECREMENT_QUANTITY": {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.productId
            ? {
              ...product,
              quantity: Math.max((product.quantity || 1) - 1, 1), // Mínimo 1
            }
            : product
        ),
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        products: [],
      };

    default: {
      console.error("Tipo de acción desconocido:", action);
      return state;
    }
  }
};
