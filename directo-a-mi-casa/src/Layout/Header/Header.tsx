import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ModuleRoutes } from "../../app/routes/routes";
import carIcon from "/src/assets/images/icons/car.svg";
import { useProducts } from "../../app/context/ProductContext";
import { useCart } from "../../app/context/CartContext";
import { filterProducts } from "../../utils/helpers";
import RenderCategories from "@/components/RenderCategories/RenderCategories";

const Header = () => {
  const { state: cartState } = useCart();
  const {
    state: productContextState,
    fetchCategoryProducts,
    resetProducts,
    dispatch,
  } = useProducts();

  const { products: cartProducts } = cartState;
  const { categories, allProducts, error } = productContextState;

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [isAccountDropdownVisible, setAccountDropdownVisible] =
    useState<boolean>(false);
  const [accountSelectedCategory, setAccountSelectedCategory] = useState<
    string | null
  >(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalQuantity = cartProducts.reduce(
    (sum, product) => sum + (product?.quantity || 0),
    0
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value.trim();
      setSearchQuery(query);

      if (query) {
        const filteredProducts = filterProducts(allProducts, query);
        dispatch({ type: "SET_FILTERED_PRODUCTS", payload: filteredProducts });

        // Navega al componente Init solo si hay resultados filtrados
        if (filteredProducts.length > 0) {
          navigate(ModuleRoutes.Init);
        }
      } else {
        dispatch({ type: "SET_FILTERED_PRODUCTS", payload: allProducts });
      }
    },
    [allProducts, navigate, dispatch]
  );

  const toggleDropdown = useCallback(() => {
    setDropdownVisible((prev) => !prev);
  }, []);

  const toggleAccountDropdown = useCallback(() => {
    setAccountDropdownVisible((prev) => !prev);
  }, []);

  const handleCategoryClick = useCallback(
    async (categoryName: string) => {
      setSelectedCategory(categoryName);
      setDropdownVisible(false);
      navigate(ModuleRoutes.Init);

      try {
        await fetchCategoryProducts(categoryName);
      } catch (error) {
        console.error("Error al obtener productos por categoría:", error);
      }
    },
    [navigate, fetchCategoryProducts]
  );

  const handleAccountCategoryClick = useCallback(
    async (categoryName: string) => {
      if (categoryName === "Login") {
        setAccountSelectedCategory(categoryName);
        setAccountDropdownVisible(false);
        navigate(ModuleRoutes.Login);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const resetAndNavigate = () => {
    resetProducts();
    navigate(ModuleRoutes.Init);
  };

  if (error) return <p>Error al cargar categorías: {error}</p>;

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
            className="relative-below"
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
          <span
            id="category-dropdown"
            className={`category-dropdown ${isDropdownVisible ? "active" : ""}`}
            onClick={toggleAccountDropdown}
          >
            Mi cuenta
            <img src="/src/assets/images/icons/arial.svg" alt="Desplegable" />
          </span>
          {isAccountDropdownVisible && (
            <RenderCategories
              className="relative-below"
              categories={["Login"]}
              onCategoryClick={handleAccountCategoryClick}
              selectedCategory={accountSelectedCategory}
            />
          )}
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
