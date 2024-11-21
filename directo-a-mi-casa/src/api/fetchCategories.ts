import { mapCategory } from "../mappers/categoryMapper";
import { Categories } from "../types/Category";


export const fetchCategories = async (): Promise<Categories> => {
    try {
        const response = await fetch("https://dummyjson.com/products/categories");
        if (!response.ok) {
            throw new Error("Error al obtener las categorías");
        }

        // por qu'e unknow?
        const data: unknown[] = await response.json();

         // Uso de Mapper
        const categories = data.map(mapCategory);
        return categories
    } catch (error) {
        console.error("Error en fetchCategories:", error);
        throw error;
    }
};