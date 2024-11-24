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
    filteredProducts: Product[];
    selectedProduct: Product | null;
    productDetails: ProductDetails | null;
}

export type ProductAction =
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "SET_FILTERED_PRODUCTS"; payload: Product[] }
    | { type: "SET_SELECTED_PRODUCT"; payload: Product | null}
    | { type: "SET_PRODUCT_DETAILS"; payload: ProductDetails | null }

export type Products = Product[];