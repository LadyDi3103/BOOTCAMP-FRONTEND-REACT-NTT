// 1. Definir el Estado y las Acciones
import { Product } from '../domain/Product';

interface CartState {
  products: Product[];
}

type Action =
  | { type: 'ADD_PRODUCT'; product: Product }
  | { type: 'REMOVE_PRODUCT'; productId: string }
  | { type: 'INCREMENT_QUANTITY'; productId: string }
  | { type: 'DECREMENT_QUANTITY'; productId: string }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  products: [],
};

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.product] };
    case 'REMOVE_PRODUCT':
      return { ...state, products: state.products.filter(p => p.id !== action.productId) };
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.productId ? { ...p, quantity: p.quantity + 1 } : p
        ),
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.productId && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
        ),
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

export { CartState, Action, initialState, cartReducer };