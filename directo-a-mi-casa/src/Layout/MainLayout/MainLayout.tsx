import React, { PropsWithChildren, useContext } from 'react';
import '../MainLayout/MainLayout.css';
import { Link } from 'react-router-dom';
import { ModuleRoutes } from '../../app/routes';
import carIcon from '/src/assets/images/icons/car.svg';
import Footer from '../Footer';
import CallToAction from '../../components/CallToAction';
import Carousel from '../../components/Carousel';
import CategoriesSection from '../../components/CategoriesSection';
import SpecialOffers from '../../components/SpecialOffers';
import CategoryItem from '../../components/CategoryItem';
import CartHandler from '../../components/cartHandler';
import { CartContext } from '../../app/context/CartContext';

interface MainLayoutI extends PropsWithChildren {}

const MainLayout: React.FC<MainLayoutI>  = ({ children }) => {
    const {products} = useContext(CartContext)
    console.log('Contador de productos', products?.length);
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
                <span id="category-dropdown" className="category-dropdown">
                    Ver categorías
                    <img src="/src/assets/images/icons/arial.svg" alt="Desplegable" />
                </span>
                <ul id="category-list" className="category-list hidden"></ul>
                <input
                    type="text"
                    id="search-box"
                    placeholder="¿Hola, qué estás buscando?"
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
                <CartHandler />
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
            {children}
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
