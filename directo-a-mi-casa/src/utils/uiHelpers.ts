
export const resetUIState = (): void => {
    const productsContainer = document.getElementById('dynamic-products') as HTMLElement | null;;
    const categoryTitleContainer = document.getElementById('category-title-container') as HTMLElement | null;
    const sections = document.querySelectorAll<HTMLElement>('section');

    productsContainer 
        ? (productsContainer.style.display = "none") 
        : console.warn("El contenedor de productos no se encontró.");

    categoryTitleContainer 
        ? (categoryTitleContainer.style.display = "none") 
        : console.warn("El contenedor del título de categoría no se encontró.");
        
    sections.forEach((section) => {
        section.style.display = "flex";
    });
};