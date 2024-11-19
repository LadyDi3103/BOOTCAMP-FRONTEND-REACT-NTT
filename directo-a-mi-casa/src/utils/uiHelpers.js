import {
    showSections
} from '../js/main';

export const resetUIState = () => {
    console.log("Restaurando el estado inicial de la UI...");

    const categoryTitleContainer = document.getElementById('category-title-container');
    const categoryList = document.getElementById("category-list");
    const categoryContainer = document.getElementById("category-title-container");
    const productsContainer = document.getElementById("dynamic-products");

    // Mostrar todas las secciones
    showSections();
    categoryTitleContainer.style.display = "";
    categoryList?.classList.remove("visible");
    categoryContainer?.classList.add("hidden");
    productsContainer.style.display = "";

    console.log("La interfaz ha sido restaurada a su estado inicial.");
};