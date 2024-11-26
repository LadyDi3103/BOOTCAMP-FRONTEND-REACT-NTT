/**
 * REDUCER sirve para actualizar el estado
 * 
 */
import { ProductState, ProductAction } from "../domain/Product";

export const initialProductState: ProductState = {
    products: [],
    allProducts: [],
    categories: [],
    specialOffers: [],
    selectedProduct: [],
    productDetails: [],
    loading: false,
    error: null,
};

export const productReducer = (
    state: ProductState,
    action: ProductAction
): ProductState => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: action.payload };

        case "SET_ERROR":
            return { ...state, error: action.payload };

        case "SET_PRODUCTS":
            return {
                ...state,
                allProducts: action.payload,
                products: action.payload,
                loading: false,
                error: null
            };

        case "SET_CATEGORIES":
            return { ...state, categories: action.payload, loading: false, error: null };

        case "SET_FILTERED_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null
            };

        case "SET_SPECIAL_OFFERS":
            return { ...state, specialOffers: action.payload, loading: false, error: null };

        case "SET_SELECTED_PRODUCT":
            return { ...state, selectedProduct: action.payload };

        case "CLEAR_SELECTED_PRODUCT":
            return { ...state, selectedProduct: [] };

        case "SET_PRODUCT_DETAILS":
            return { ...state, productDetails: action.payload, loading: false, error: null };

        case "CLEAR_PRODUCT_DETAILS":
                return { ...state, productDetails: [] };

        default:
            return state;
    }
};
