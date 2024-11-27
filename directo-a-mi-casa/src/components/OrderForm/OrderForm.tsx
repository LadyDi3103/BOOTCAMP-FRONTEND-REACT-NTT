import React from 'react';
import './OrderForm.css';
import { FormState } from '../../app/domain/FormState';
import { District } from '../../app/domain/District';

interface OrderFormProps {
    form: FormState;
    errors: Partial<FormState>;
    districts: District[];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancelOrder: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({
    form,
    errors,
    districts,
    onChange,
    onSubmit,
    onCancelOrder,
}) => {
    return (
        <div className="order-form-container">
            <form onSubmit={onSubmit} className="order-form">

                <div className="form-header">
                    <div className="form-header-content">
                        <img
                            src="/src/assets/images/icons/delivery_car.svg"
                            alt="Delivery"
                            className="form-header-image"
                        />
                        <h3 className="form-title">
                            ¡Completa tus datos para recibir tu pedido! 📦
                        </h3>
                    </div>
                </div>

                {Object.keys(form).map((field) => (
                    <div className="form-group" key={field}>
                        <label htmlFor={field}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        {field === 'distrito' ? (
                            <select
                                id={field}
                                name={field}
                                value={form[field as keyof FormState]}
                                onChange={onChange}
                            >
                                <option value="">Seleccione un distrito</option>
                                {districts.map((district:District) => (
                                    <option key={district.id} value={district.name}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                id={field}
                                type={field === 'celular' ? 'tel' : 'text'}
                                name={field}
                                value={form[field as keyof FormState]}
                                onChange={onChange}
                            />
                        )}
                        {errors[field as keyof FormState] && (
                            <span className="error-message">
                                {errors[field as keyof FormState]}
                            </span>
                        )}
                    </div>
                ))}

                <div className="btn__form">
                    <button
                        type="submit"
                        className="btn__order btn_order__submit">
                        <img
                            src="src/assets/images/icons/shopping_checkout.svg"
                            alt="Carrito"
                            className="cart-icon"
                        />
                        Comprar
                    </button>

                    <button
                        type="button"
                        className="btn__order btn_order__cancelar"
                        onClick={onCancelOrder}
                    >
                        <img
                            src="/src/assets/images/icons/remove_cart.svg"
                            alt="Cancelar"
                            className="cart-icon"
                        />
                        Cancelar Orden
                    </button>
                </div>
            </form>
        </div>

    );
}
export default OrderForm;
