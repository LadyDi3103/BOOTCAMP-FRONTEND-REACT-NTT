import React, { PropsWithChildren, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModuleRoutes } from "../../app/routes";
import "../MainLayout/MainLayout.css";
import carIcon from "/src/assets/images/icons/car.svg";
import Footer from "../Footer/Footer";
import CallToAction from "../../components/CallToAction";
import Carousel from "../../components/Carousel";
import CategoriesSection from "../../components/CategoriesSection";
import SpecialOffers from "../../components/SpecialOffers";
import ProductCard from "../../shared/components/ProductCard/ProductCard";
import { useCart } from "../../app/context/CartContext";
import { Category } from "../../app/domain/Category";
import { Product } from '../../app/domain/Product';
import { fetchCategories } from "../../app/services/fetchCategories";
import RenderCategories from "../../components/renderCategories";
import { filterProducts } from "../../utils/helpers";
import CategoryItem from "../../components/CategoryItem";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { state } = useCart(); // Accedemos a state desde el contexto
    const products = state.products;

    console.log('Contador de productos', products?.length);

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    // Cargar categorías al montar el componente
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Error al cargar las categorías:", error);
            }
        };
        loadCategories();
    }, []);

    // Filtrar productos al cambiar el texto de búsqueda
    useEffect(() => {
        const filtered = filterProducts(products, searchQuery);
        setFilteredProducts(filtered);
    }, [products, searchQuery]);



    // Manejar clic en una categoría
    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);

        // Filtrar productos por categoría
        const filtered = products.filter(
            (product) => product.category.toLowerCase() === category.toLowerCase()
        );
        setFilteredProducts(filtered);
        setDropdownVisible(false);
    };

    // Manejar cambios en el input de búsqueda
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    // Mostrar/ocultar dropdown de categorías
    const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

    return (
        <>
            <header>
                {/* Logo */}
                <div className="logo" id="logo">
                    <Link to={ModuleRoutes.MainLayout}>
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
                        className={`category-dropdown ${isDropdownVisible ? "active" : ""
                            }`}
                        onClick={toggleDropdown}
                    >
                        Ver categorías
                        <img src="/src/assets/images/icons/arial.svg" alt="Desplegable" />
                    </span>
                    {isDropdownVisible && (
                        <RenderCategories
                            categories={categories}
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
                                <strong>TODOS</strong> los productos
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
                            <span className="cart-badge">{products?.length}</span>
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

            <main>
                <CallToAction />
                {/* Renderizar productos filtrados */}
                {selectedCategory ? (
                    <div>
                        <h2>Productos de la categoría: {selectedCategory}</h2>
                        <div className="products-container">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ) : (
                    children
                )}
                <Carousel />
                <CategoriesSection />
                <CategoryItem />
                <SpecialOffers />
            </main>
            <Footer />
        </>

    );
};

export default MainLayout;
