import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../domain/Product';
import { productRequest } from '../services/fetchProducts';

interface ProductContextProps {
  products: Product[];
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productRequest.fetchAllProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextProps => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de un ProductProvider');
  }
  return context;
};