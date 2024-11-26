import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CategoryTitleContainer from "../../../shared/components/CategoryTitleContainer";
import './ResumenPage.css';
import { Product } from '../../domain/Product';
import CallToAction from '../../../components/CallToAction/CallToAction';
import { FormState } from '../../domain/FormState';


const initialFormState: FormState = {
  nombre: '',
  apellidos: '',
  distrito: '',
  direccion: '',
  referencia: '',
  celular: '',
};

const ResumenPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  console.log('Estado del carrito:', state.products);

  const normalizeProduct = (product: Partial<Product>): Product => ({
    id: product.id || 0,
    title: product.title || '',
    name: product.name || '',
    description: product.description || '',
    price: product.price || 0,
    thumbnail: product.thumbnail || '',
    category: product.category || '',
    quantity: Number(product.quantity) || 0,
  });

  const products = state.products.map(normalizeProduct);

  const handleIncrement = (productId: number): void => {
    dispatch({ type: 'INCREMENT_QUANTITY', productId });
  };

  const handleDecrement = (productId: number): void => {
    dispatch({ type: 'DECREMENT_QUANTITY', productId });
  };

  const handleRemove = (productId: number): void => {
    dispatch({ type: 'REMOVE_PRODUCT', productId });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Campo obligatorio',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const validationErrors: Partial<FormState> = {};
    Object.keys(form).forEach((key) => {
      if (form[key as keyof FormState].trim() === '') {
        validationErrors[key as keyof FormState] = 'Campo obligatorio';
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert('Su pedido se registró con éxito');
    console.log('Formulario enviado:', form);
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = products
    .reduce((sum, product) => sum + product.price * (Number(product.quantity) || 0), 0)
    .toFixed(2);

  return (
    <>
      <CallToAction />
      <CategoryTitleContainer title="Resumen de Órden" />

      {state.products.length === 0 ? (
        <div className="empty-cart-message">
          <p>No tienes productos en tu carrito. ¡Añade algo para continuar!</p>
          <div className="empty-cart-illustration">
            <img src="/src/assets/images/icons/cart.svg" alt="Carrito vacío" />
          </div>
        </div>
      ) : (
        <>
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
                {state.products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        width="80"
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn decrement"
                          onClick={() => handleDecrement(product.id)}
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          className="quantity-btn increment"
                          onClick={() => handleIncrement(product.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleRemove(product.id)}
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

          <div className="order-form-container">
            <form onSubmit={handleSubmit} className="order-form">
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
                  <input
                    id={field}
                    type="text"
                    name={field}
                    value={form[field as keyof FormState]}
                    onChange={handleChange}
                  />
                  {errors[field as keyof FormState] && (
                    <span className="error-message">
                      {errors[field as keyof FormState]}
                    </span>
                  )}
                </div>
              )
              )}
              <div className="btn__form">
                <button type="submit" className="btn__order btn_order__submit">
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
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
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
        </>
      )}
    </>
  );
}

export default ResumenPage;