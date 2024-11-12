import React, { useState } from 'react';
import carIcon from '/src/assets/images/icons/car.svg';
// import './CartHandler.css';

const CartHandler: React.FC = () => {
    const [cartCount, setCartCount] = useState<number>(0);

    // Incrementar el contador del carrito
    const handleAddToCart = () => {
        setCartCount((prevCount) => prevCount + 1);
    };

    return (
        <div className="cart">
            {/* Badge del carrito */}
            <img src={carIcon} alt="Carrito de compras" className="cart-icon" />
            <span
                className="cart-badge"
                style={{ display: cartCount > 0 ? 'flex' : 'none' }}
            >
                {cartCount}
            </span>

            {/* Botón para agregar productos */}
            <button className="add-to-cart" onClick={handleAddToCart}>
                Agregar al carrito
            </button>
        </div>
    );
};

export default CartHandler;
