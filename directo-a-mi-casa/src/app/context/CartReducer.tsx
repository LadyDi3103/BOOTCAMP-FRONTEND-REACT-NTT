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

export const cartReducer = (state: CartState, action: Action): CartState => {
  console.log("Acción recibida:", action.type);
  console.log("Estado actual antes de la acción:", state);

  switch (action.type) {
    case "ADD_PRODUCT": {
      const existingProduct = state.products.find(
        (product) => product.id === action.product.id
      );

      if (existingProduct) {
        console.log("Producto ya en el carrito, incrementando cantidad.");
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.product.id
              ? { ...product, quantity: (product.quantity || 1) + 1 }
              : product
          ),
        };
      }

      console.log("Producto agregado:", action.product);
      return {
        ...state,
        products: [...state.products, { ...action.product, quantity: 1 }],
      };
    }

    case "REMOVE_PRODUCT": {
      console.log("Producto eliminado con ID:", action.productId);
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.productId
        ),
      };
    }

    case "INCREMENT_QUANTITY": {
      console.log("Incrementando cantidad del producto con ID:", action.productId);
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
      console.log("Decrementando cantidad del producto con ID:", action.productId);
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.productId
            ? {
                ...product,
                quantity: Math.max((product.quantity || 1) - 1, 1), // No permitir cantidades menores a 1
              }
            : product
        ),
      };
    }

    case "CLEAR_CART":
      console.log("Carrito limpiado");
      return {
        ...state,
        products: [],
      };

    default: {
      console.error("Tipo de acción desconocido:", action);
      return state;
  }
};
}