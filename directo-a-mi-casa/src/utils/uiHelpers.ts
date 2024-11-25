export const resetUIState = (): void => {
    console.log("Restaurando el estado inicial de la UI...");

    // Obtener referencias a los contenedores
    const productsContainer = document.getElementById('dynamic-products') as HTMLElement | null;
    const categoryTitleContainer = document.getElementById('category-title-container') as HTMLElement | null;
    const sections = document.querySelectorAll<HTMLElement>('section');

    // Verificar y actualizar el estado del contenedor de productos
    if (productsContainer) {
        productsContainer.style.display = "none";
    } else {
        console.warn("El contenedor de productos no se encontró.");
    }

    // Verificar y actualizar el estado del contenedor del título de la categoría
    if (categoryTitleContainer) {
        categoryTitleContainer.style.display = "none";
    } else {
        console.warn("El contenedor del título de categoría no se encontró.");
    }

    // Restaurar la visibilidad de todas las secciones
    sections.forEach((section) => {
        section.style.display = "flex";
    });
};


