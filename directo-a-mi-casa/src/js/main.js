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
import { fetchAllProducts } from "./api/fetchProducts.js";
// Referencias a elementos HTML
const categoryDropdown = document.getElementById("category-dropdown");
const categoryList = document.getElementById("category-list");
const sections = document.querySelectorAll("main > section:not(.cta)");



// Función para cargar y mostrar las categorías
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

        const products  = await fetchAllProducts();
        console.log("Productos obtenidos:", products);

        // Renderizar productos en el DOM, o realizar acciones adicionales
        renderProducts(products);
    } catch (error) {
        console.error("No se pudieron cargar los productos:", error);
    }
};

// Evento para manejar clics en las categorías
const handleCategoryClick = (event) => {
    if (event.target.tagName === "LI") {
        const selectedCategory = event.target.dataset.categoryUrl; // Asumiendo que el atributo data-category-url está en cada <li>
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

// Evento para el logo: restaurar las secciones al estado inicial
document.getElementById('logo').addEventListener('click', () => {
    console.log("Click en logo:");
    // Ocultar el contenedor de productos
    const productsContainer = document.getElementById('product-container');
    if (productsContainer) {
        productsContainer.style.display = "none";
    }
    sections.forEach((section) => {
        section.style.display = "flex";
    });
});