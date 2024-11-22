import { mapCategory } from "../../mappers/categoryMapper";
import { Category } from '../domain/Category';


export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await fetch("https://dummyjson.com/products/categories");
        if (!response.ok) {
            throw new Error("Error al obtener las categorías");
        }

        const data: Category[] = await response.json();
        console.log(data);

         // Uso de Mapper
        const categories = data.map(mapCategory);
        console.log('categories', categories)
        return categories
    } catch (error) {
        console.error("Error en fetchCategories:", error);
        throw error;
    }
};