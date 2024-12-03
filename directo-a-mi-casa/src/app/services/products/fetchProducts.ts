import environment from '@/environments/environment';
import { mapProductDetail } from '@/mappers/productDetailMapper';
import { ProductDetails } from '../../domain/ProductDetail';
import { mapProduct } from '@/mappers/product.mapper';
import { Product} from '@/app/domain/Product';
import { CategoryStrings } from '@/app/domain/Category';
import { ProductPagination } from '@/app/domain/Pagination';

/**
 * Obtiene todos los productos desde la API.
 */
export const fetchAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}`);
        if (!response.ok) throw new Error("Error al obtener todos los productos");
        const data = await response.json();
        return data.products.map(mapProduct);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};

/**
 * Obtiene todas las categorías desde la API.
 */
export const fetchAllCategories = async (): Promise<CategoryStrings[]> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.CATEGORIES_LIST_ENDPOINT}`);
        if (!response.ok) throw new Error("Error al obtener las categorías");
        const categories: CategoryStrings[] = await response.json();

        return categories;
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        throw error;
    }
};

/**
 * Obtiene productos filtrados por categoría.
 */
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.SINGLE_CATEGORY_ENDPOINT}${category}`);
        if (!response.ok) throw new Error(`Error al obtener productos de la categoría ${category}`);
        const data = await response.json();
        return data.products.map(mapProduct);
    } catch (error) {
        console.error("Error al obtener productos por categoría:", error);
        throw error;
    }
};

/**
 * Obtiene los detalles de un producto por ID.
 */
export const fetchSingleProduct = async (id: number): Promise<ProductDetails> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.SINGLE_PRODUCT_ENDPOINT}/${id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        const data = await response.json();
        return mapProductDetail(data);
    } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
        throw error;
    }
};

/**
 * Obtiene productos paginados con límite y desplazamiento.
 */
export const fetchPaginatedProducts = async (limit: number, skip: number): Promise<ProductPagination> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}?limit=${limit}&skip=${skip}`);
        if (!response.ok) throw new Error("Error al obtener productos paginados");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener productos paginados:", error);
        throw error;
    }
};

/**
 * Obtiene productos filtrados con parámetros específicos.
 */
export const fetchFilteredProducts = async (limit: number, skip: number, select: string): Promise<Product[]> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}?limit=${limit}&skip=${skip}&select=${select}`);
        if (!response.ok) throw new Error("Error al obtener productos filtrados");
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error al obtener productos filtrados:", error);
        throw error;
    }
};

/**
 * Obtiene productos ordenados según un criterio y orden (ascendente o descendente).
 */
export const fetchSortedProducts = async (sortBy: string, order: 'asc' | 'desc'): Promise<Product[]> => {
    try {
        const response = await fetch(`${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}?sortBy=${sortBy}&order=${order}`);
        if (!response.ok) throw new Error("Error al ordenar productos");
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
