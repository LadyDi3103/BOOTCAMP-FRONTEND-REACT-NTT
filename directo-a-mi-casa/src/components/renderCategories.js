// Lógica para construir y renderizar la lista de categorías.
export const renderCategories = (categories, categoryList, onCategoryClick) => {
    // Limpiar el contenido existente en vez de innerHTML
    while (categoryList.firstChild) {
        categoryList.removeChild(categoryList.firstChild);
    }

    // Crear y añadir cada categoría a la lista
    categories.forEach((category) => {
        const li = document.createElement("li");
        li.textContent = category.name;
        li.dataset.url = category.url;
        li.addEventListener("click", () => onCategoryClick(category.url));
        categoryList.appendChild(li);
    });
};