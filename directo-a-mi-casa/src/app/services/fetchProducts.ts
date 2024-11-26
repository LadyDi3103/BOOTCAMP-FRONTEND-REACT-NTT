
import environment from '../../environments/environment';
import { mapProductDetail } from '../../mappers/productDetailMapper';
import { mapProduct } from '../../mappers/productMapper';
import { CategoryStrings } from '../domain/Category';
import { Product } from '../domain/Product';
import { ProductDetails } from '../domain/ProductDetail';

  /**
   * Cargar TODOS los productos desde la API.
   */
const fetchAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}`);
        if (!response.ok) {
            throw new Error("Error al obtener TODOS los productos");
        }

        const data = await response.json();
        const products = data.products.map(mapProduct);

        return products;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};

   /**
   * Cargar todas las categorías desde la API.
   */
export const fetchAllCategories = async (): Promise<CategoryStrings[]> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.CATEGORIES_LIST_ENDPOINT}`);

        if (!response.ok) {
            throw new Error("Error al obtener las categorías");
        }

        const categories: CategoryStrings[] = await response.json();
        // no console
        console.log("categoriesFETCHED:", categories);
        return categories;
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        throw error;
    }
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.SINGLE_CATEGORY_ENDPOINT}${category}`);
        if (!response.ok) {
            throw new Error(`Error al obtener productos de la categoría ${category}`);
        }

        const data = await response.json();
        return data.products.map(mapProduct); // Aplica el mapper
    } catch (error) {
        console.error("Error al obtener productos por categoría:", error);
        throw error;
    }
};

const fetchSingleProduct = async (id: number): Promise<ProductDetails> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.SINGLE_PRODUCT_ENDPOINT}/${id}`);
        if (!response.ok) {
            throw new Error("Error al obtener TODOS los productos");
        }

        const data = await response.json();
        const productDetails = mapProductDetail(data);
        return productDetails;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};

export const fetchPaginatedProducts = async (limit: number, skip: number): Promise<Product[]> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}?limit=${limit}&skip=${skip}`);
        if (!response.ok) {
            throw new Error("Error al obtener productos paginados");
        }
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error al obtener productos paginados:", error);
        throw error;
    }
};

export const fetchFilteredProducts = async (limit: number, skip: number, select: string): Promise<Product[]> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}?limit=${limit}&skip=${skip}&select=${select}`);
        if (!response.ok) {
            throw new Error("Error al obtener productos filtrados");
        }
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error al obtener productos filtrados:", error);
        throw error;
    }
};

export const fetchSortedProducts = async (sortBy: string, order: 'asc' | 'desc'): Promise<Product[]> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}?sortBy=${sortBy}&order=${order}`);
        if (!response.ok) {
            throw new Error("Error al ordenar productos");
        }
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error al ordenar productos:", error);
        throw error;
    }
};

export const productRequest = {
    fetchAllProducts,
    fetchAllCategories,
    fetchProductsByCategory,
    fetchFilteredProducts,
    fetchSingleProduct,
    fetchPaginatedProducts,
    fetchSortedProducts
};