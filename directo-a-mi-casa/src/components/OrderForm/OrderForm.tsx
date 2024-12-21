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

                <div className='form__container'>
                    {/* Nombre y Apellidos */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                id="nombre"
                                name="nombre"
                                value={form.nombre}
                                onChange={onChange}
                            />
                            {errors.nombre && <div className="error-message">{errors.nombre}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input
                                id="apellidos"
                                name="apellidos"
                                value={form.apellidos}
                                onChange={onChange}
                            />
                            {errors.apellidos && <div className="error-message">{errors.apellidos}</div>}
                        </div>
                    </div>

                    {/* Celular y Distrito */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="celular">Celular</label>
                            <input
                                id="celular"
                                name="celular"
                                type="tel"
                                value={form.celular}
                                onChange={onChange}
                            />
                            {errors.celular && <div className="error-message">{errors.celular}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="distrito">Distrito</label>
                            <select
                                id="distrito"
                                name="distrito"
                                value={form.distrito}
                                onChange={onChange}
                            >
                                <option value="">Seleccione un distrito</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.name}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                            {errors.distrito && <div className="error-message">{errors.distrito}</div>}
                        </div>
                    </div>

                    {/* Dirección y Referencia */}
                    <div className="form-group full-width">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            id="direccion"
                            name="direccion"
                            value={form.direccion}
                            onChange={onChange}
                        />
                        {errors.direccion && <div className="error-message">{errors.direccion}</div>}
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="referencia">Referencia</label>
                        <input
                            id="referencia"
                            name="referencia"
                            value={form.referencia}
                            onChange={onChange}
                        />
                        {errors.referencia && <div className="error-message">{errors.referencia}</div>}
                    </div>
                </div>




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
