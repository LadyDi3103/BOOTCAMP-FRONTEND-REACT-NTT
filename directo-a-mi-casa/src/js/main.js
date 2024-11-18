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
import { resetUIState } from '../utils/uiHelpers.js';

// VARIABLES -> Referencias a elementos HTML
const categoryDropdown = document.getElementById("category-dropdown");
const categoryList = document.getElementById("category-list");
const sections = document.querySelectorAll("main > section:not(.cta)");

// Fn cargar y mostrar las categorías
const loadCategories = async () => {
    try {
        const categories = await fetchCategories();

        renderCategories(categories, categoryList, loadProductsByCategory);
        categoryList.classList.add("visible");
    } catch (error) {
        console.error("Error al cargar las categorías:", error);
    }
};

// Función para cargar productos y ocultar otras secciones
const loadProductsByCategory = async (categoryUrl) => {
    try {
        console.log("Iniciando carga de productos para la categoría:", categoryUrl);

        sections.forEach((section) => {
            section.style.display = "none";
        });

        const response = await fetchProductsByCategory(categoryUrl);
        const products = response.products;

        if (!Array.isArray(products)) {
            throw new Error("La propiedad 'products' no es un array.");
        }

        renderProducts(products);
        categoryList.classList.remove("visible");
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};

const loadAllProducts = async () => {
    try {
        sections.forEach((section) => {
            section.style.display = "none";
        });

        const products = await fetchAllProducts();

        renderProducts(products); // Renderiza productos en el DOM
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


// Evento de clic en el botón "Todas las categorías"
categoryDropdown.addEventListener("click", () => {
    if (!categoryList.classList.contains("visible")) {
        loadCategories();
    } else {
        categoryList.classList.remove("visible");
    }
});

document.getElementById('load-products-btn').addEventListener('click', loadAllProducts);
document.addEventListener("click", handleClickOutside);
categoryList.addEventListener("click", handleCategoryClick);

document.getElementById('logo').addEventListener('click', resetUIState);

// Lógica para el botón de cierre
const closeButton = document.createElement('button');
closeButton.className = 'close-btn';
closeButton.innerHTML = '<img src="src/assets/images/icons/close-icon.svg" alt="Cerrar">';
closeButton.addEventListener('click', resetUIState);

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    initializeCartButtons();
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const products = await fetchAllProducts();
        const searchBox = document.getElementById('search-box');

        // Filtrar productos al escribir en el input
        searchBox.addEventListener('input', (event) => {
            const query = event.target.value.trim();
            const filteredProducts = filterProducts(products, query);
            renderProducts(filteredProducts);
            sections.forEach((section) => {
                section.style.display = "none";
            });
        });

        // Limpiar el input al perder el foco
        searchBox.addEventListener('blur', () => {
            searchBox.value = '';
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
});

document.getElementById('close-category-btn').addEventListener('click', () => {
    const categoryContainer = document.getElementById('category-title-container');
    const productsContainer = document.getElementById('dynamic-products');

    // Oculta las secciones relacionadas
    categoryContainer.style.display = 'none';
    productsContainer.style.display = 'none';
});
