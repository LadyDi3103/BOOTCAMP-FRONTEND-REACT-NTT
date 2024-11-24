import { CategoryStrings } from './Category';
import { ProductDetails } from './ProductDetail';

export interface Product {
    id: number;
    title: string;
    name?: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    quantity?: number;
}

export interface ProductState {
    products: Product[];
    categories: CategoryStrings[];
    specialOffers: Product[];
    filteredProducts: Product[];
    selectedProduct: Product | null;
    productDetails: ProductDetails | null;
    loading: false,
    error: string | null;
}

    export type ProductAction =
  | { type: "SET_LOADING"; payload: boolean } 
  | { type: "SET_ERROR"; payload: string | null } 
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_CATEGORIES"; payload: CategoryStrings[] } 
  | { type: "SET_FILTERED_PRODUCTS"; payload: Product[] } 
  | { type: "SET_SPECIAL_OFFERS"; payload: Product[] } 
  | { type: "SET_SELECTED_PRODUCT"; payload: Product } 
  | { type: "SET_PRODUCT_DETAILS"; payload: ProductDetails }


export type Products = Product[];