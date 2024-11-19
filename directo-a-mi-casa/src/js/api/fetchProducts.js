import { mapProduct } from "../mappers/productMapper";

export const fetchProductsByCategory = async (categoryUrl) => {
    const response = await fetch(categoryUrl);
    if (!response.ok) {
        throw new Error("Error al obtener productos para esta categoría");
    }
    const products = await response.json();
    return products;
};

export const fetchAllProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
            throw new Error("Error al obtener TODOS los productos");
        }

        // Parsear los datos JSON obtenidos desde la API
        const data = await response.json();
        console.log(data, 'DATA')

        // Mapear los productos para devolver solo la información necesaria
        const products = data.products.map(mapProduct);
        return products;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error; 
    }
};