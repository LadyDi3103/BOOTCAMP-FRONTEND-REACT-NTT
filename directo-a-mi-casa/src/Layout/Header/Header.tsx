import { useEffect, useState, useRef, useCallback, useContext, ChangeEvent } from "react";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import { ModuleRoutes } from "../../app/routes/routes";
import carIcon from "/src/assets/images/icons/car.svg";
import { useProducts } from "../../app/context/ProductContext";
import { useCart } from "../../app/context/CartContext";
import { AuthContext } from "@/app/context/AuthContext";
import { filterProducts } from "@/utils/helpers/helpers";
import RenderCategories from "@/components/RenderCategories/renderCategories";

const menuCategories: string[] = [
  'Mis Pedidos',
  'Todos los Productos',
  'Ofertas especiales',
  'Cerrar sesión',
];

const Header = () => {
  const { state: cartState } = useCart();
  const { state: productContextState, fetchCategoryProducts, resetProducts, dispatch } = useProducts();

  const { products: cartProducts } = cartState;
  const { categories, allProducts, error } = productContextState;

  const navigate = useNavigate();
  const { loggedUser, logoutUser, userData } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isMobileMenuVisible, setMobileMenuVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAccountDropdownVisible, setAccountDropdownVisible] = useState<boolean>(false);
  const [accountSelectedCategory, setAccountSelectedCategory] = useState<string | null>(null);
  const [menuSelectedCategory, setMenuSelectedCategory] = useState<string | null>(null);

  const authCategories: string[] = loggedUser ? ["Cerrar sesión"] : ["Login"];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalQuantity = cartProducts.reduce((sum, product) => sum + (product?.quantity || 0), 0);

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value.trim();
      setSearchQuery(query);

      if (query) {
        const filteredProducts = filterProducts(allProducts, query);
        dispatch({ type: "SET_FILTERED_PRODUCTS", payload: filteredProducts });
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

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuVisible((prev) => !prev);
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
      switch (categoryName) {
        case "Login":
          setAccountSelectedCategory(categoryName);
          setAccountDropdownVisible(false);
          navigate(ModuleRoutes.Login);
          break;
        case "Cerrar sesión":
          setAccountSelectedCategory(categoryName);
          setAccountDropdownVisible(false);
          logoutUser();
          break;
        default:
          break;
      }
    },
    [navigate, logoutUser]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
        setAccountDropdownVisible(false);
        setMobileMenuVisible(false);
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

  const handleMenuCategoryClick = useCallback(
    async (categoryName: string) => {
      switch (categoryName) {
        case "Mis Pedidos":
          setMenuSelectedCategory(categoryName);
          setMobileMenuVisible(false);
          navigate(ModuleRoutes.Resumen);
          break;
        case "Todos los Productos":
          setMenuSelectedCategory(categoryName);
          setMobileMenuVisible(false);
          navigate(ModuleRoutes.Init);
          break;
        case "Ofertas especiales":
          setMenuSelectedCategory(categoryName);
          setMobileMenuVisible(false);
          navigate(ModuleRoutes.MarketPage);
          break;
        case "Cerrar sesión":
          setMenuSelectedCategory(categoryName);
          setMobileMenuVisible(false);
          logoutUser();
          break;
        default:
          break;
      }
    },
    [navigate, logoutUser]
  );

  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo" id="logo">
        <Link to={ModuleRoutes.Home}>
          <img
            src="/src/assets/images/logos/icon_logo.svg"
            alt="DirectoAMiCasa"
            className="header__logo-image header__logo-image--mobile"
          />
          <img
            src="/src/assets/images/logos/logo_desktop.svg"
            alt="DirectoAMiCasa"
            className="header__logo-image header__logo-image--desktop"
          />
        </Link>
      </div>

      {/* Buscador */}
      {loggedUser && (
        <div className="header__search-container">
          <span
            id="category-dropdown"
            className={`header__category-dropdown ${isDropdownVisible ? "header__category-dropdown--active" : ""}`}
            onClick={toggleDropdown}
          >
            Ver categorías
            <img
              src="/src/assets/images/icons/arial.svg"
              alt="Desplegable"
              className="header__category-icon"
            />
          </span>
          {isDropdownVisible && (
            <RenderCategories
              setOpen={setDropdownVisible}
              className="relative-below"
              categories={categories}
              onCategoryClick={handleCategoryClick}
              selectedCategory={selectedCategory}
            />
          )}
          <input
            type="text"
            id="search-box"
            className="header__search-input"
            placeholder="¿Hola, qué estás buscando?"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <img
            src="/src/assets/images/icons/search.svg"
            alt="Ícono buscar"
            className="header__search-icon"
          />
        </div>
      )}

      {/* Carrito y Menú */}
      <nav className={loggedUser ? "header__nav" : ""}>
        {loggedUser && (
          <>
            <div className="header__btn-products">
              <button
                id="load-products-btn"
                className="header__btn-load-products"
                onClick={resetAndNavigate}
              >
                TODOS los productos
              </button>
            </div>

            <div className="header__orders-section">
              <img
                src="/src/assets/images/icons/package.svg"
                alt="Paquete"
                className="header__orders-icon"
              />
              <span className="header__orders-text">Mis pedidos</span>
            </div>
          </>
        )}
        {/* Sección de Cuenta */}
        <div className={`header__account-section ${!loggedUser ? "guest" : ""}`}>
          <img
            src="/src/assets/images/icons/person.svg"
            alt={loggedUser ? "Icono de persona" : "Icono de cuenta"}
            className={`header__account-icon ${isAccountDropdownVisible ? "header__account-icon--active" : ""}`}
            onClick={toggleAccountDropdown}
          />
          <span
            id="account-dropdown"
            className={`header__account-dropdown ${isAccountDropdownVisible ? "header__account-dropdown--active" : ""}`}
            onClick={toggleAccountDropdown}
          >
            {loggedUser && userData ? (
              <>BIENVENIDA: {userData?.firstName} {userData?.lastName}</>
            ) : (
              "Mi cuenta"
            )}
            <img
              src="/src/assets/images/icons/arial.svg"
              alt="Desplegable"
              className="header__account-icon-dropdown"
            />
          </span>
          {isAccountDropdownVisible && (
            <RenderCategories
              setOpen={setAccountDropdownVisible}
              className="relative-below"
              categories={authCategories}
              onCategoryClick={handleAccountCategoryClick}
              selectedCategory={accountSelectedCategory}
            />
          )}
        </div>

        {loggedUser && (
          <div className="header__cart">
            <Link to={ModuleRoutes.Resumen}>
              <img
                src={carIcon}
                alt="Carrito de compras"
                className="header__cart-icon"
              />
              <span className="header__cart-badge">{totalQuantity}</span>
            </Link>
          </div>
        )}

        {loggedUser && (
          <div className="header__account-icon--logout">
            <img
              src="/src/assets/images/icons/logout_icon.svg"
              alt="Icono de cerrar sesión"
              className="header__logout-icon "
              onClick={logoutUser}
            />
          </div>
        )}
      </nav>


      {/* Menú móvil */}
      {loggedUser && (
        <div className="menu_mobile">
          <img
            src="/src/assets/images/icons/mobile_menu.svg"
            alt="Abrir menú móvil"
            onClick={toggleMobileMenu}
          />
          {isMobileMenuVisible && (
            <>
              <RenderCategories
                setOpen={setMobileMenuVisible}
                className="relative-below-menu"
                categories={menuCategories}
                onCategoryClick={handleMenuCategoryClick}
                selectedCategory={menuSelectedCategory}
              />
            </>
          )}
        </div>
      )}

    </header>
  );
};

export default Header;
