import {
    fetchAllProducts
} from "./api/fetchProducts.js";
import {
    fetchCategories
} from "./api/fetchCategories.js";
import {
    fetchProductsByCategory
} from "./api/fetchProducts.js";
import {
    renderCategories
} from "../components/renderCategories.js";
import {
    renderProducts
} from "../components/renderProducts.js";
import {
    initializeCartButtons,
    updateCartBadge
} from '../components/cartHandler.js';
import {
    filterProducts
} from '../utils/helpers.js';
import {
    resetUIState
} from '../utils/uiHelpers.js';

// VARIABLES -> Referencias a elementos HTML
const categoryDropdown = document.getElementById("category-dropdown");
const categoryList = document.getElementById("category-list");
const sections = document.querySelectorAll("main > section:not(.cta)");
const searchBox = document.getElementById('search-box');
const closeCategoryButton = document.getElementById('close-category-btn');

// Fn para ocultar todas las secciones
export const hideSections = () => {
    console.log("Ocultando secciones...");
    sections.forEach((section) => {
        section.style.display = "none";
    });
};

export const showSections = () => {
    console.log("Mostrando todas las secciones...");
    sections.forEach((section) => {
        section.style.display = "";
    });
};

const handleCategoryList = (
    categories,
    categoryList,
    loadProductsByCategory
) => {
    if (!categoryList) {
        console.error("categoryList no está disponible en el DOM.");
        return;
    }

    renderCategories(categories, categoryList, loadProductsByCategory);
    categoryList.classList.add("visible");
};

// Fn cargar y mostrar las categorías
const loadCategories = async () => {
    try {
        const categories = await fetchCategories();
        handleCategoryList(categories, categoryList, loadProductsByCategory);
    } catch (error) {
        console.error("Error al cargar las categorías:", error);
    }
};

// Fn para cargar productos y ocultar otras secciones
const loadProductsByCategory = async (categoryUrl) => {
    try {
        hideSections();
        const response = await fetchProductsByCategory(categoryUrl);
        const products = response.products;

        renderProducts(products);
        categoryList.classList.remove("visible");
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};

const loadAllProducts = async () => {
    try {
        const products = await fetchAllProducts();
        renderProducts(products);
    } catch (error) {
        console.error("No se pudieron cargar los productos:", error);
    }
};

// Evento para manejar clics en las categorías
const handleCategoryClick = (event) => {
    if (event.target.tagName === "LI") {
        const selectedCategory = event.target.dataset.categoryUrl;
        if (selectedCategory) {
            loadProductsByCategory(selectedCategory);
            categoryList.classList.remove("visible");
        }
    }
};

// Manejo del clic fuera del dropdown
const handleClickOutside = (event) => {
    if (!categoryDropdown.contains(event.target) && !categoryList.contains(event.target)) {
        categoryList.classList.remove("visible");
    }
};

const setupSearchBox = (products) => {
    if (!searchBox) {
        console.error("El elemento 'searchBox' no se encontró en el DOM.");
        return;
    }

    // Evento para filtrar productos al escribir
    searchBox.addEventListener('input', (event) => {
        const query = event.target.value.trim();
        const filteredProducts = filterProducts(products, query);
        renderProducts(filteredProducts);
        hideSections();
    });

    // Evento para limpiar el input al perder el foco
    searchBox.addEventListener('blur', () => {
        searchBox.value = '';
    });
};

const setupCloseCategoryButton = () => {
    if (!closeCategoryButton) {
        console.error("El botón 'close-category-btn' no se encontró en el DOM.");
        return;
    }

    closeCategoryButton.addEventListener('click', () => {
        console.log("Clic en el botón 'X'");
        resetUIState();
    });
}

// Inicializar eventos principales
const initializeEvents = () => {
    categoryDropdown?.addEventListener("click", () => {
        if (!categoryList.classList.contains("visible")) {
            loadCategories();
        } else {
            categoryList.classList.remove("visible");
        }
    });

    document.addEventListener("click", handleClickOutside);
    categoryList.addEventListener("click", handleCategoryClick);

    document.getElementById("logo")?.addEventListener("click", () => {
        console.log("Clic en el logo");
        resetUIState();
    });

    document.getElementById("load-products-btn").addEventListener("click", loadAllProducts);
};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const products = await fetchAllProducts();
        setupSearchBox(products);
        setupCloseCategoryButton();
        initializeEvents();
        updateCartBadge();
        initializeCartButtons();

    } catch (error) {
        console.error("Error al inicializar la aplicación:", error);
    }
});