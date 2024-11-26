/**
 * REDUCER
 * Maneja las actualizaciones del estado de productos según las acciones definidas.
 */
import { ProductState, ProductAction } from "../domain/Product";

// Estado inicial del contexto de productos
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

// Reducer para manejar las acciones sobre el estado de productos
export const productReducer = (
    state: ProductState,
    action: ProductAction
): ProductState => {
    switch (action.type) {
        case "SET_LOADING":
            // Actualiza el estado de carga
            return { ...state, loading: action.payload };

        case "SET_ERROR":
            // Maneja los errores del estado
            return { ...state, error: action.payload };

        case "SET_PRODUCTS":
            // Carga todos los productos y los establece en el estado
            return {
                ...state,
                allProducts: action.payload,
                products: action.payload,
                loading: false,
                error: null,
            };

        case "SET_CATEGORIES":
            // Carga las categorías de productos
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null,
            };

        case "SET_FILTERED_PRODUCTS":
            // Actualiza los productos filtrados
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null,
            };

        case "SET_SPECIAL_OFFERS":
            // Establece las ofertas especiales
            return {
                ...state,
                specialOffers: action.payload,
                loading: false,
                error: null,
            };

        case "SET_SELECTED_PRODUCT":
            // Selecciona un producto
            return { ...state, selectedProduct: action.payload };

        case "CLEAR_SELECTED_PRODUCT":
            // Limpia el producto seleccionado
            return { ...state, selectedProduct: [] };

        case "SET_PRODUCT_DETAILS":
            // Establece los detalles del producto
            return {
                ...state,
                productDetails: action.payload,
                loading: false,
                error: null,
            };

        case "CLEAR_PRODUCT_DETAILS":
            // Limpia los detalles del producto
            return { ...state, productDetails: [] };

        default:
            // Retorna el estado actual si la acción no está definida
            return state;
    }
};
