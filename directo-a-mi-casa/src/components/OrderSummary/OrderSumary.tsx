import React from "react";
import "./OrderSummary.css";
import { Product } from "../../app/domain/Product";

interface OrderSummaryProps {
    products: Product[];
    total: string;
    onIncrement: (productId: number) => void;
    onDecrement: (productId: number) => void;
    onRemove: (productId: number) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    products,
    total,
    onIncrement,
    onDecrement,
    onRemove,
}) => {
    return (
        <div className="order-summary">
            <table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
            </table>
            {/* Contenedor con scroll para el cuerpo */}
            <div className="cart-table__scroll">
                <table>
                    <tbody className="cart-table__body">
                        {products.map((product) => (
                            <tr key={product.id} className="cart-table__body-row">
                                <td className="cart-table__body-cell">
                                    <img src={product.thumbnail} alt={product.name} width="60" />
                                </td>
                                <td className="cart-table__body-cell">{product.title}</td>
                                <td className="cart-table__body-cell">{product.price}</td>
                                <td className="cart-table__body-cell">
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-btn decrement"
                                            onClick={() => onDecrement(product.id)}
                                        >
                                            -
                                        </button>
                                        <span>{product.quantity}</span>
                                        <button
                                            className="quantity-btn increment"
                                            onClick={() => onIncrement(product.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td className="cart-table__body-cell">
                                    <button
                                        className="delete-btn"
                                        onClick={() => onRemove(product.id)}
                                    >
                                        <img
                                            src="/src/assets/images/icons/delete_forever.svg"
                                            alt="Eliminar"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Contenedor para el total */}
            <div className="total-container">
                <span>Total a pagar:</span> <strong>S/{total}</strong>
            </div>
        </div>
    );
};

export default OrderSummary;
