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
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialProductState);

  /**
   * Cargar productos al inicializar la aplicación.
   */
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
   * Cargar los productos por categoria.
   */
  const fetchCategoryProducts = async (category: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await productRequest.fetchProductsByCategory(category);
      // Filtrar productos basados en la categoría usando `allProducts`
      console.log(`Productos filtrados por categoría (${category}):`, data);

      dispatch({ type: "SET_FILTERED_PRODUCTS", payload: data });
    } catch (error) {
      console.error("Error al cargar productos por categoría:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  /**
   * Seleccionar un producto.
   */
  const setSelectedProduct = (product: Product) => {
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
  };

  /**
 * Restablecer productos al estado original.
 */
  const resetProducts = () => {
    dispatch({ type: "SET_FILTERED_PRODUCTS", payload: state.allProducts });
    console.log("Productos restablecidos a todos los originales:", state.allProducts);
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