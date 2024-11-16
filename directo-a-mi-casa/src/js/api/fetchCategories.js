export const fetchCategories = async () => {
    const response = await fetch("https://dummyjson.com/products/categories");
    if (!response.ok) {
        throw new Error("Error al obtener las categorías");
    }
    const categories = await response.json();
    return categories.map((category) => ({
        name: category.name,
        url: category.url,
    }));
};