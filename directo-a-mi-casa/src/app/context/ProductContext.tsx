import React, { createContext, useContext, useReducer, ReactNode  } from 'react';
import { Product, ProductState, ProductAction } from '../domain/Product';
import { productRequest } from '../services/fetchProducts';
import { initialProductState, productReducer } from './ProductReducer';
import { ProductDetails } from '../domain/ProductDetail';
import { getTopNLowestPricedProducts } from '../../utils/helpers';


interface ProductContextProps {
  state: ProductState;
  // filteredProducts: Product[];
  dispatch: React.Dispatch<ProductAction>;
  fetchProducts: () => Promise<void>;
  fetchCategoryProducts: (categoryUrl: string) => Promise<void>;
  fetchProductDetails: (productId: number) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialProductState);
  // const [products, setProducts] = useState<Product[]>([]);
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const data: Product[] = await productRequest.fetchAllProducts();
      dispatch({ type: "SET_PRODUCTS", payload: data });

      // Calcular ofertas especiales y almacenarlas
      const topOffers = getTopNLowestPricedProducts(data, 10);
      dispatch({ type: "SET_SPECIAL_OFFERS", payload: topOffers });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      console.error("Error al cargar productos:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

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

  const fetchCategoryProducts = async (categoryUrl: string) => {
    try {
      const data = await productRequest.fetchProductsByCategory(categoryUrl);
      console.log(`Productos filtrados por categoría (${categoryUrl}):`, data);
      dispatch({ type: "SET_FILTERED_PRODUCTS", payload: data });
      // setFilteredProducts(data); // Actualiza el estado de productos filtrados
    } catch (error) {
      console.error('Error al cargar productos filtrados por categoría:', error);
    }
  };

  const setSelectedProduct = (product: Product | null) => {
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
  };

  return (
    // <ProductContext.Provider value={{ products, filteredProducts, fetchCategoryProducts }}>
    <ProductContext.Provider 
    value={{ 
      state, 
      dispatch, 
      fetchProducts, 
      fetchCategoryProducts, 
      fetchProductDetails,
      setSelectedProduct 
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