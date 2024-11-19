import { fetchAllProducts } from "./api/fetchProducts";
import { fetchCategories } from "./api/fetchCategories";
import { fetchProductsByCategory } from "./api/fetchProducts";
import { renderCategories } from "../components/renderCategories";
import { renderProducts } from "../components/renderProducts";
import { initializeCartButtons, updateCartBadge } from '../components/cartHandler';
import { filterProducts } from '../utils/helpers';
import { resetUIState } from '../utils/uiHelpers';
import { Product } from '../types/Product';

// VARIABLES -> Referencias a elementos HTML
const categoryDropdown = document.getElementById("category-dropdown") as HTMLElement | null;
const categoryList = document.getElementById("category-list") as HTMLElement | null;
const sections = document.querySelectorAll("main > section:not(.cta)") as NodeListOf<HTMLElement>;
const searchBox = document.getElementById('search-box') as HTMLInputElement | null;
const categoryContainer = document.getElementById('category-title-container') as HTMLElement | null;
const productsContainer = document.getElementById('dynamic-products') as HTMLElement | null;
const closeCategoryButton = document.getElementById('close-category-btn') as HTMLElement | null;

// Fn para ocultar todas las secciones
const hideSections = (): void => {
    sections.forEach((section) => {
        section.style.display = "none";
    });
};

// Fn cargar y mostrar las categorías
const loadCategories = async (): Promise<void> => {
    try {
        const categories = await fetchCategories();
        renderCategories(categories, categoryList, loadProductsByCategory);
        categoryList!.classList.add("visible");
    } catch (error) {
        console.error("Error al cargar las categorías:", error);
    }
};

// Fn para cargar productos y ocultar otras secciones
const loadProductsByCategory = async (categoryUrl: string): Promise<void> => {
    try {
        hideSections();

        const products: Product[] = await fetchProductsByCategory(categoryUrl);
        renderProducts(products);
        categoryList?.classList.remove("visible");
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};

const loadAllProducts = async (): Promise<void> => {
    try {
        hideSections();

        const products: Product[] = await fetchAllProducts();
        renderProducts(products);
    } catch (error) {
        console.error("No se pudieron cargar los productos:", error);
    }
};

// Evento para manejar clics en las categorías
const handleCategoryClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "LI") {
        const selectedCategory = target.dataset.categoryUrl;
        if (selectedCategory) {
            loadProductsByCategory(selectedCategory);
            categoryList?.classList.remove("visible");
        }
    }
};
// Manejo del clic fuera del dropdown
const handleClickOutside = (event: MouseEvent): void => {
    if (!categoryDropdown?.contains(event.target as Node) && !categoryList?.contains(event.target as Node)) {
        categoryList!.classList.remove("visible");
    }
};

// Fn para configurar el evento de búsqueda
const setupSearchBox = (products: Product[]): void => {
    if (!searchBox) {
        console.error("El elemento 'searchBox' no se encontró en el DOM.");
        return;
    }

    // Evento para filtrar productos al escribir
    searchBox.addEventListener('input', (event: Event) => {
        const input = event.target as HTMLInputElement;
        const query = input.value.trim();
        const filteredProducts = filterProducts(products, query);
        renderProducts(filteredProducts);
        hideSections();
    });

    // Evento para limpiar el input al perder el foco
    searchBox.addEventListener('blur', () => {
        searchBox.value = '';
    });
};

const setupCloseCategoryButton = (): void => {
    if (!closeCategoryButton) {
        console.error("El botón 'close-category-btn' no se encontró en el DOM.");
        return;
    }

    closeCategoryButton.addEventListener('click', () => {
        categoryContainer
            ? (categoryContainer.style.display = 'none')
            : console.warn("El contenedor de la categoría no se encontró.");

        productsContainer
            ? (productsContainer.style.display = 'none')
            : console.warn("El contenedor de productos no se encontró.");
    });
}

// Evento de clic en el botón "Todas las categorías"
categoryDropdown?.addEventListener("click", () => {
    if (!categoryList?.classList.contains("visible")) {
        loadCategories();
    } else {
        categoryList.classList.remove("visible");
    }
});

// Inicializar eventos principales
const initializeEvents = (): void => {
    categoryDropdown?.addEventListener("click", () => {
        if (!categoryList?.classList.contains("visible")) {
            loadCategories();
        } else {
            categoryList?.classList.remove("visible");
        }
    });

    document.addEventListener("click", handleClickOutside);
    categoryList?.addEventListener("click", handleCategoryClick);

    document.getElementById("logo")?.addEventListener("click", resetUIState);

    document.getElementById("load-products-btn")?.addEventListener("click", loadAllProducts);
};


document.addEventListener("DOMContentLoaded", async () => {
    try {
        const products: Product[] = await fetchAllProducts();
        setupSearchBox(products); 
        setupCloseCategoryButton(); 
        initializeEvents(); 
        updateCartBadge();
        initializeCartButtons();
    } catch (error) {
        console.error("Error al inicializar la aplicación:", error);
    }
});

