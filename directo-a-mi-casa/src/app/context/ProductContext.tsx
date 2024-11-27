import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product, ProductState, ProductAction } from '../domain/Product';
import { productRequest } from '../services/fetchProducts';
import { initialProductState, productReducer } from './ProductReducer';
import { ProductDetails } from '../domain/ProductDetail';
import { getTopNLowestPricedProducts } from '../../utils/helpers';

interface ProductContextProps {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  fetchCategoryProducts: (categoryUrl: string) => Promise<void>;
  fetchProductDetails: (productId: number) => Promise<void>;
  setSelectedProduct: (product: Product) => void;
  resetProducts: () => void;
  clearProductDetails: () => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialProductState);

  useEffect(() => {
    const loadInitialProducts = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const products = await productRequest.fetchAllProducts();
        const categories = await productRequest.fetchAllCategories();
        const topOffers = getTopNLowestPricedProducts(products, 9);

        dispatch({ type: "SET_PRODUCTS", payload: products });
        dispatch({ type: "SET_CATEGORIES", payload: categories });
        dispatch({ type: "SET_SPECIAL_OFFERS", payload: topOffers });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadInitialProducts();
  }, []);

  /**
   * Cargar detalles de un producto.
   * Realiza una petición para obtener la información completa del producto seleccionado.
   */
  const fetchProductDetails = async (productId: number) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const data: ProductDetails = await productRequest.fetchSingleProduct(productId);
      dispatch({ type: "SET_PRODUCT_DETAILS", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      console.error("Error al cargar detalles del producto:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  /**
   * Cargar los productos por categoría.
   * Filtra los productos según la categoría seleccionada.
   */
  const fetchCategoryProducts = async (category: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await productRequest.fetchProductsByCategory(category);

      dispatch({ type: "SET_FILTERED_PRODUCTS", payload: data });
    } catch (error) {
      console.error("Error al cargar productos por categoría:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const setSelectedProduct = (product: Product) => {
    fetchProductDetails(product.id);
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
    dispatch({ type: "SET_PRODUCT_DETAILS", payload: product });

    if (!state.productDetails) {
      return <p>Cargando detalles del producto...</p>;
    }
  };


  const resetProducts = () => {
    dispatch({ type: "SET_FILTERED_PRODUCTS", payload: state.allProducts });
  
  };

  const clearProductDetails = () => {
    dispatch({ type: "CLEAR_PRODUCT_DETAILS" });
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        fetchCategoryProducts,
        fetchProductDetails,
        setSelectedProduct,
        resetProducts,
        clearProductDetails,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextProps => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducts debe usarse dentro de un ProductProvider');
  }

  return context;
};
