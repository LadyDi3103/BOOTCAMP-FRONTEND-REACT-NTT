import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ModuleRoutes } from "../../app/routes";
import carIcon from "/src/assets/images/icons/car.svg";
import { useProducts } from "../../app/context/ProductContext";
import { useCart } from "../../app/context/CartContext";
import { filterProducts } from "../../utils/helpers";
import { Product } from "../../app/domain/Product";
import RenderCategories from "../../components/renderCategories";


const Header = () => {
    const { state: cartState } = useCart();
    const { state: productContextState, fetchCategoryProducts, resetProducts, dispatch } = useProducts();

    const { products: cartProducts } = cartState;
    const { categories, loading, error } = productContextState;

    const navigate = useNavigate();

    console.log("Estado del contexto de productos:", productContextState);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const totalQuantity=cartProducts.reduce((sum, product) => sum + (product?.quantity || 0), 0); 

// Manejar cambios en el input de búsqueda
const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.trim(); // Elimina espacios al inicio y final
        setSearchQuery(query); // Actualiza el estado del texto ingresado

        if (query) {
            // Si hay texto, filtra los productos
            const newFilteredProducts = filterProducts(productContextState.allProducts, query); 

            // Actualiza los productos filtrados en el estado local y global
            setFilteredProducts(newFilteredProducts);
            dispatch({ type: "SET_FILTERED_PRODUCTS", payload: newFilteredProducts });

            console.log("Texto de búsqueda actualizado:", query);
            console.log("Productos filtrados:", newFilteredProducts);

            // Navega al componente Init solo si hay resultados filtrados
            if (newFilteredProducts.length > 0) {
                navigate(ModuleRoutes.Init);
            } else {
                console.log("No se encontraron productos para la búsqueda.");
            }
        } else {
            // Si no hay texto, restablece los productos al estado inicial
            const resetProducts = productContextState.allProducts || [];
            setFilteredProducts(resetProducts);
            dispatch({ type: "SET_FILTERED_PRODUCTS", payload: resetProducts });

            console.log("No hay texto en el buscador. Productos restablecidos.");
        }
    },
    [productContextState.allProducts, navigate, dispatch]
);

    // Mostrar/ocultar dropdown de categorías
    const toggleDropdown = useCallback(() => {
        setDropdownVisible((prev) => !prev);
    }, []);

    const handleCategoryClick = useCallback(
        async (categoryName: string) => {
            setSelectedCategory(categoryName);
            setDropdownVisible(false);
            navigate(ModuleRoutes.Init);
            console.log(`Categoría seleccionada: ${categoryName}`);
            try {
                await fetchCategoryProducts(categoryName);
            } catch (error) {
                console.error("Error al obtener productos por categoría:", error);
            }
        },
        [navigate, fetchCategoryProducts]
    );

    // Cierra el menú si el usuario hace clic fuera del componente 🙌🙌🙌
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownVisible(false);
                console.log("Cerrando dropdown al hacer clic fuera del componente.");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (error) return <p>Error al cargar categorías: {error}</p>;

    /**
* Resetea los productos y navega al Init
*/
    const resetAndNavigate = () => {
        resetProducts();
        navigate(ModuleRoutes.Init);
    };

    return (
        <header>
            {/* Logo */}
            <div className="logo" id="logo">
                <Link to={ModuleRoutes.Home}>
                    <img
                        src="/src/assets/images/logos/icon_logo.svg"
                        alt="DirectoAMiCasa"
                        className="logo_mobile"
                    />
                    <img
                        src="/src/assets/images/logos/logo_desktop.svg"
                        alt="DirectoAMiCasa"
                        className="logo_desktop"
                    />
                </Link>
            </div>

            {/* Buscador */}
            <div className="search-container">
                <span
                    id="category-dropdown"
                    className={`category-dropdown ${isDropdownVisible ? "active" : ""}`}
                    onClick={toggleDropdown}
                >
                    Ver categorías
                    <img src="/src/assets/images/icons/arial.svg" alt="Desplegable" />
                </span>
                {/* Mostrar lista de categorías si el dropdown está visible */}
                {isDropdownVisible && (
                    <RenderCategories
                        categories={categories || []}
                        onCategoryClick={handleCategoryClick}
                        selectedCategory={selectedCategory}
                    />
                )}
                <input
                    type="text"
                    id="search-box"
                    placeholder="¿Hola, qué estás buscando?"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <img
                    src="/src/assets/images/icons/search.svg"
                    alt="Ícono buscar"
                    className="search-icon"
                />
            </div>

            {/* Carrito y Menú */}
            <nav>
                <div className="cart">
                    <button
                        id="load-products-btn"
                        className="btn-load-products"
                        onClick={resetAndNavigate}
                    >
                        TODOS los productos
                    </button>
                </div>

                <div className="orders-section">
                    <img
                        src="/src/assets/images/icons/package.svg"
                        alt="Paquete"
                        className="orders-icon"
                    />
                    <span className="orders-text">Mis pedidos</span>
                </div>

                <div className="account-section">
                    <img
                        src="/src/assets/images/icons/person.svg"
                        alt="Icono de persona"
                        className="account-icon"
                    />
                    <span className="cart-text">Mi cuenta</span>
                    <img
                        src="/src/assets/images/icons/arial.svg"
                        alt="Icono de flecha"
                        className="account-arrow"
                    />
                </div>

                <div className="cart">
                    <Link to={ModuleRoutes.Resumen}>
                        <img src={carIcon} alt="Carrito de compras" className="cart-icon" />
                        <span className="cart-badge">{totalQuantity}</span>
                    </Link>
                </div>

            </nav>

            {/* Menú móvil */}
            <div className="menu_mobile">
                <a href="#">
                    <img
                        src="/src/assets/images/icons/mobile_menu.svg"
                        alt="Abrir menú móvil"
                    />
                </a>
            </div>
        </header>
    );
};

export default Header;
