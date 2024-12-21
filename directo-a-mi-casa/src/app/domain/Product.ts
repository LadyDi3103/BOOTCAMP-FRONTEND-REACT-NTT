import { CategoryStrings } from './Category';
import { ProductDetails } from './ProductDetail';

/**
 * Interfaz para un producto individual.
 */
export interface Product {
  id: number;
  title: string;
  name?: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity?: number;
  description?: string;
  discountPercentage: number;
}

/**
 * Estado global para el contexto de productos.
 */
export interface ProductState {
  products: Product[];
  categories: CategoryStrings[];
  specialOffers: Product[];
  allProducts: Product[];
  selectedProduct: Product;
  productDetails: ProductDetails;
  loading: boolean;
  error: string | null;
}

/**
 * Tipos de acciones que el reducer puede manejar.
 */
export type ProductAction =
  | { type: "SET_LOADING"; payload: boolean } 
  | { type: "SET_ERROR"; payload: string | null } 
  | { type: "SET_PRODUCTS"; payload: Product[] } 
  | { type: "SET_CATEGORIES"; payload: CategoryStrings[] }
  | { type: "SET_FILTERED_PRODUCTS"; payload: Product[] }
  | { type: "SET_SPECIAL_OFFERS"; payload: Product[] } 
  | { type: "SET_SELECTED_PRODUCT"; payload: Product} 
  | { type: "CLEAR_SELECTED_PRODUCT" } 
  | { type: "SET_PRODUCT_DETAILS"; payload: ProductDetails} 
  | { type: "CLEAR_PRODUCT_DETAILS" }; 


export type Products = Product[];
