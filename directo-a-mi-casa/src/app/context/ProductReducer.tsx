import { ProductState, ProductAction } from "../domain/Product";

export const initialProductState: ProductState = {
    products: [],
    filteredProducts: [],
    selectedProduct: null,
    productDetails: null,
};

export const productReducer = (
    state: ProductState, 
    action: ProductAction
): ProductState => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        case "SET_FILTERED_PRODUCTS":
            return { ...state, filteredProducts: action.payload };
        case "SET_SELECTED_PRODUCT":
            return { ...state, selectedProduct: action.payload };
        case "SET_PRODUCT_DETAILS":
            return { ...state, productDetails: action.payload };
            
        default:
            return state;
    }
};
