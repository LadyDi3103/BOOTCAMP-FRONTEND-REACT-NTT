import React, { useContext } from 'react';
import { CartContext } from '../app/context/CartContext';

const SpecialOffers: React.FC = () => {

const {products, setProducts, addProduct } = useContext(CartContext)

// console.log('products', products);
    return (
        <section className="special-offers">
            <div className="offers-header">
                <h2>
                    ¡Sólo por hoy!{' '}
                    <img
                        src="/src/assets/images/icons/clock.svg"
                        alt="reloj"
                        className="clock-icon"
                    />
                </h2>

                <div className="timer">
                    <span>
                        05 <small>Hrs</small>
                    </span>
                    <span>
                        05 <small>Min</small>
                    </span>
                    <span>
                        05 <small>Seg</small>
                    </span>
                </div>
            </div>
            <div className="products-container">
                {/* Repite las tarjetas de producto aquí */}
                <div className="product-card">
                    <img src="/src/assets/images/frutas/higos.svg" alt="Higos" />
                    <p className="product-name">Higos RICA COSECHA x1kg</p>
                    <div className="product-price-wrapper">
                        <p className="product-price">S/ 9.90</p>
                    </div>
                    <button className="add-to-cart" onClick={addProduct}>
                        Agregar{' '}
                        <img
                            src="/src/assets/images/icons/white_car.svg"
                            alt="Carrito"
                            className="cart-icon"
                        />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
