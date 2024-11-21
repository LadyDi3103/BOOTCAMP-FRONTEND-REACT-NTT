import { mapProduct } from '../mappers/productMapper';
import { Product } from '../types/Product';

export const fetchProductsByCategory = async (categoryUrl: string): Promise<Product[]> => {
    try {
        const response = await fetch(categoryUrl);
        if (!response.ok) {
            throw new Error("Error al obtener productos para esta categoría");
        }

        // por qu'e unknow? por qu'e no un tipado?
        const data: unknown = await response.json();

        // Verificar si la respuesta tiene la estructura correcta
        // por qu'e es necesario esta validaci'on?
        if (typeof data !== 'object' || data === null || !('products' in data)) {
            throw new Error("Los datos obtenidos no son válidos");
        }

        const products = (data as { products: Product[] }).products;

        if (!Array.isArray(products)) {
            throw new Error("Los datos obtenidos no son un array");
        }

        return products;
    } catch (error) {
        console.error("Error en fetchProductsByCategory:", error);
        throw error;
    }
};

export const fetchAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
            throw new Error("Error al obtener TODOS los productos");
        }

        const data: unknown= await response.json();

        // Uso de Mapper
        const products = (data as { products: Product[] }).products.map((product) => mapProduct(product));
        return products;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};

