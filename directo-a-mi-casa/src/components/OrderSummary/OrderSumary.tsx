import React from 'react';
import './OrderSummary.css';
import { Product } from '../../app/domain/Product';

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
    onRemove
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
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <img src={product.thumbnail} alt={product.name} width="80" />
                            </td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>
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
                            <td>
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
            <div className="total-container">
                <span>Total a pagar:</span> <strong>S/{total}</strong>
            </div>
        </div>
    );
};

export default OrderSummary;
