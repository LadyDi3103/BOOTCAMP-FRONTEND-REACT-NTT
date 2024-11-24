import { ProductState, ProductAction } from "../domain/Product";

export const initialProductState: ProductState = {
    products: [],
    specialOffers: [],
    filteredProducts: [],
    selectedProduct: null,
    productDetails: null,
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
            return { ...state, products: action.payload, loading: false, error: null };

        case "SET_FILTERED_PRODUCTS":
            return { ...state, filteredProducts: action.payload, loading: false, error: null };

        case "SET_SPECIAL_OFFERS":
            return { ...state, specialOffers: action.payload, loading: false, error: null };

        case "SET_SELECTED_PRODUCT":
            return { ...state, selectedProduct: action.payload };

        case "SET_PRODUCT_DETAILS":
            return { ...state, productDetails: action.payload, loading: false, error: null };

        default:
            return state;
    }
};
