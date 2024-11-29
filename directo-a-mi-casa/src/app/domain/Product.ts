import { CategoryStrings } from './Category';
import { ProductDetails } from './ProductDetail';

/**
 * Interfaz para un producto individual.
 */
export interface Product {
  id: number;
  title: string;
  name?: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity?: number; // Cantidad opcional (usada en el carrito, por ejemplo).
}

/**
 * Estado global para el contexto de productos.
 */
export interface ProductState {
  products: Product[]; // Productos filtrados actualmente.
  categories: CategoryStrings[]; // Categorías disponibles.
  specialOffers: Product[]; // Ofertas especiales destacadas.
  allProducts: Product[]; // Todos los productos cargados (sin filtrar).
  selectedProduct: Product[]; // Producto seleccionado actualmente.
  productDetails: ProductDetails[]; // Detalles del producto seleccionado.
  loading: boolean; // Estado de carga de datos.
  error: string | null; // Error en caso de fallos en la carga de datos.
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
  | { type: "SET_SELECTED_PRODUCT"; payload: Product[]} 
  | { type: "CLEAR_SELECTED_PRODUCT" } 
  | { type: "SET_PRODUCT_DETAILS"; payload: [ProductDetails]} 
  | { type: "CLEAR_PRODUCT_DETAILS" }; 

/**
 * Tipo de alias para un array de productos.
 */
export type Products = Product[];
