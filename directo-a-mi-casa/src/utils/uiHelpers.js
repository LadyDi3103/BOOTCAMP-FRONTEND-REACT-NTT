
export const resetUIState = () => {
    console.log("Restaurando el estado inicial de la UI...");
    const productsContainer = document.getElementById('dynamic-products');
    const categoryTitleContainer = document.getElementById('category-title-container');
    const sections = document.querySelectorAll('section');

    if (productsContainer) {
        productsContainer.style.display = "none";
    }
    if (categoryTitleContainer) {
        categoryTitleContainer.style.display = "none";
    }
    sections.forEach((section) => {
        section.style.display = "flex";
    });
};