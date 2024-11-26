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
  | { type: "SET_LOADING"; payload: boolean } // Establece el estado de carga.
  | { type: "SET_ERROR"; payload: string | null } // Establece el mensaje de error.
  | { type: "SET_PRODUCTS"; payload: Product[] } // Establece la lista de productos.
  | { type: "SET_CATEGORIES"; payload: CategoryStrings[] } // Establece las categorías.
  | { type: "SET_FILTERED_PRODUCTS"; payload: Product[] } // Establece los productos filtrados.
  | { type: "SET_SPECIAL_OFFERS"; payload: Product[] } // Establece las ofertas especiales.
  | { type: "SET_SELECTED_PRODUCT"; payload: Product[]} // Establece el producto seleccionado.
  | { type: "CLEAR_SELECTED_PRODUCT" } // Limpia el producto seleccionado.
  | { type: "SET_PRODUCT_DETAILS"; payload: ProductDetails[]} // Establece los detalles del producto.
  | { type: "CLEAR_PRODUCT_DETAILS" }; // Limpia los detalles del producto.

/**
 * Tipo de alias para un array de productos.
 */
export type Products = Product[];
