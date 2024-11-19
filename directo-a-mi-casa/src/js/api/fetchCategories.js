import { mapCategory } from "../mappers/categoryMapper";

export const fetchCategories = async () => {
    try {
        const response = await fetch("https://dummyjson.com/products/categories");
        if (!response.ok) {
            throw new Error("Error al obtener las categorías");
        }

        // Uso de Mapper
        const categories = (await response.json()).map(mapCategory);
        return categories
    } catch (error) {
        console.error("Error en fetchCategories:", error);
        throw error;
    }
};