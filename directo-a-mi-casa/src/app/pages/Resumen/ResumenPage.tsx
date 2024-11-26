import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CategoryTitleContainer from "../../../shared/components/CategoryTitleContainer";
import './ResumenPage.css';
import { Product } from '../../domain/Product';
import CallToAction from '../../../components/CallToAction/CallToAction';
import { FormState } from '../../domain/FormState';
import { useDistricts } from '../../../shared/hooks/useDistricts';

// Estado inicial del formulario
const initialFormState: FormState = {
  nombre: '',
  apellidos: '',
  distrito: '',
  direccion: '',
  referencia: '',
  celular: '',
};

  // Normaliza un producto asegurando valores predeterminados
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
/**
 * Componente ResumenPage
 * Muestra el resumen de productos en el carrito y un formulario de compra.
 */
const ResumenPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const districts = useDistricts();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState("");
  // Lista de productos normalizados
  const products = state.products.map(normalizeProduct);

  // Incrementa la cantidad de un producto en el carrito
  const handleIncrement = (productId: number): void => {
    dispatch({ type: 'INCREMENT_QUANTITY', productId });
  };

  // Decrementa la cantidad de un producto en el carrito
  const handleDecrement = (productId: number): void => {
    dispatch({ type: 'DECREMENT_QUANTITY', productId });
  };

  // Elimina un producto del carrito
  const handleRemove = (productId: number): void => {
    dispatch({ type: 'REMOVE_PRODUCT', productId });
  };

  // Validaciones específicas para cada campo
  const validateField = (fieldName: string, value: string): string | null => {
    switch (fieldName) {
      case 'nombre':
      case 'apellidos':
        return /^[a-zA-Z\s]+$/.test(value) ? null : 'Debe ingresar un valor válido';
      case 'celular':
        return /^[0-9]{9}$/.test(value) ? null : 'Debe ingresar un número válido de 9 dígitos';
      case 'distrito':
        return value ? null : 'Seleccione un distrito';
      case 'direccion':
      case 'referencia':
        return value.trim() ? null : 'Campo obligatorio';
      default:
        return null;
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: Partial<FormState> = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key as keyof FormState]);
      if (error) validationErrors[key as keyof FormState] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert('Por favor, complete todos los campos del formulario correctamente.');
      return;
    }

    if (products.length === 0) {
      alert('No hay productos en el carrito. Por favor, añada productos antes de realizar el pedido.');
      return;
    }

    alert('Su pedido se registró con éxito');
    console.log('Formulario enviado:', form);

    dispatch({ type: 'CLEAR_CART' });
    setForm(initialFormState);
  };


  // Calcula el total del carrito
  const total = products
    .reduce((sum, product) => sum + product.price * (Number(product.quantity) || 0), 0)
    .toFixed(2);

// Manejar el clic en "Cancelar Orden"
  const handleCancelOrderClick = () => {
    if (state.products.length === 0) {
      // Si no hay productos, mostrar mensaje de error
      setModalMessage("No tienes productos en tu carrito. No puedes cancelar una orden vacía.");
    } else {
      // Mostrar el modal de confirmación
      setModalMessage("¿Estás seguro de que quieres cancelar la orden?");
    }
    setShowModal(true);
  };

  // Confirmar la cancelación
  const handleConfirmCancel = () => {
    dispatch({ type: "CLEAR_CART" });
    setShowModal(false);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };


    return (
      <>
        <CallToAction />
        <CategoryTitleContainer title="Resumen de Órden" />
    
        {/* Mensaje cuando el carrito está vacío */}
        {state.products.length === 0 && (
          <div className="empty-cart-message">
            <p>No tienes productos en tu carrito. ¡Añade algo para continuar!</p>
            <div className="empty-cart-illustration">
              <img src="/src/assets/images/icons/cart.svg" alt="Carrito vacío" />
            </div>
          </div>
        )}
    
        {/* Resumen de productos en el carrito */}
        {state.products.length > 0 && (
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
                      <img src={product.thumbnail} alt={product.name} width="80" />
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
        )}
    
        {/* Formulario de compra */}
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
                {field === "distrito" ? (
                  <select
                    id={field}
                    name={field}
                    value={form[field as keyof FormState]}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un distrito</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field}
                    type={field === "celular" ? "tel" : "text"}
                    name={field}
                    value={form[field as keyof FormState]}
                    onChange={handleChange}
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
                onClick={() => setShowModal(true)}
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
    
        {/* Modal de confirmación */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>¿Estás seguro de que quieres cancelar la orden?</h3>
              <div className="modal-actions">
                <button
                  className="btn__order btn_order__cancelar"
                  onClick={handleCancelOrder}
                >
                  Sí, cancelar
                </button>
                <button
                  className="btn__order btn_order__submit"
                  onClick={handleCloseModal}
                >
                  No, mantener
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
};

export default ResumenPage;
