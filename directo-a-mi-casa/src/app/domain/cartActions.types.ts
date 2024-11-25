import { Product } from './Product';

export type Action =
  | { type: "ADD_PRODUCT"; product: Product }
  | { type: "REMOVE_PRODUCT"; productId: string | number }
  | { type: "INCREMENT_QUANTITY"; productId: string | number }
  | { type: "DECREMENT_QUANTITY"; productId: string | number }
  | { type: "CLEAR_CART" };