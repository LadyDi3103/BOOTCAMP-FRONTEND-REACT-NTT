import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ModuleRoutes } from "../../app/routes";
import carIcon from "/src/assets/images/icons/car.svg";
import { useProducts } from "../../app/context/ProductContext";
import { useCart } from "../../app/context/CartContext";
import RenderCategories from "../../components/RenderCategories";
import { filterProducts } from "../../utils/helpers";


const Header = () => {
    const { state: cartState } = useCart();
    const { state: productContextState, fetchCategoryProducts } = useProducts();

    const { products: cartProducts } = cartState;
    const { products: availableProducts, categories } = productContextState;

    console.log('categories desde el producState', categories);
    console.log("Estado del contexto de productos:", productContextState);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    // Esta variable será para manejar el filtro en el input de búsqueda
    const [filteredProducts, setFilteredProducts] = useState(availableProducts || []);
    const dropdownRef = useRef<HTMLDivElement>(null);

    console.log("Contador de productos en el carrito:", cartProducts?.length);

  // Manejar cambios en el input de búsqueda
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      console.log("Texto de búsqueda actualizado:", query);
    },
    []
  );

    // Mostrar/ocultar dropdown de categorías
    const toggleDropdown = useCallback(() => {
        setDropdownVisible((prev) => !prev);
        console.log("Estado del dropdown de categorías:", !isDropdownVisible);
    }, [isDropdownVisible]);

    const handleCategoryClick = useCallback(
        async(categoryName: string) => {
        setSelectedCategory(categoryName);
        setDropdownVisible(false);
        console.log(`Categoría seleccionada: ${categoryName}`);
        await fetchCategoryProducts(categoryName);
        try {
            await fetchCategoryProducts(categoryName);
          } catch (error) {
            console.error("Error al obtener productos por categoría:", error);
          }
        },
        [fetchCategoryProducts]
    );

    // Cierra el menú si el usuario hace clic fuera del componente
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

        // Filtrar productos al cambiar el texto de búsqueda
        useEffect(() => {
            if (availableProducts) {
                const filtered = filterProducts(availableProducts, searchQuery);
                setFilteredProducts(filtered);
                console.log("Productos filtrados:", filtered);
            } else {
      console.warn("No hay productos disponibles para filtrar.");
      setFilteredProducts([]);
            }
        }, [availableProducts, searchQuery]);

        // if (loading) return <p>Cargando categorías...</p>;
        // if (error) return <p>Error al cargar categorías: {error}</p>;

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
                        <Link to={ModuleRoutes.Init}>
                            <button id="load-products-btn" className="btn-load-products">
                                TODOS los productos
                            </button>
                        </Link>
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
                            <span className="cart-badge">{cartProducts?.length}</span>
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
