import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CategoryTitleContainer from "../../../shared/components/CategoryTitleBar/CategoryTitleBar";
import './ResumenPage.css';
import { Product } from '../../domain/Product';
import CallToAction from '../../../shared/components/CallToAction/CallToAction';
import { FormState } from '../../domain/FormState';
import { useDistricts } from '../../../shared/hooks/useDistricts';
import Modal from '../../../shared/components/Modal/Modal';
import OrderSummary from '../../../components/OrderSummary/OrderSumary';
import OrderForm from '../../../components/OrderForm/OrderForm';
import { useNavigate } from "react-router-dom";

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
  const districts = useDistricts().districts;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState("");
  const [singleButton, setSingleButton] = useState<boolean>(false);
  const navigate = useNavigate();

  // Lista de productos normalizados
  const products = state.products.map(normalizeProduct);

  const total = products
    .reduce((sum, product) => sum + product.price * (product.quantity || 0), 0)
    .toFixed(2);

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

// Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Manejar cambios en el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (products.length === 0) {
      setModalMessage('Su carrito está vacío. Por favor, añada productos antes de realizar el pedido.');
      setSingleButton(true);
      setShowModal(true);
      return;
    }

    const validationErrors: Partial<FormState> = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key as keyof FormState]);
      if (error) validationErrors[key as keyof FormState] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setModalMessage('Por favor, complete todos los campos del formulario correctamente.');
      setSingleButton(true); 
      setShowModal(true);
      return;
    }

    setModalMessage('Su pedido se registró con éxito');
    setSingleButton(true); 
    setShowModal(true);
    console.log('Formulario enviado:', form); 
    // 🔴 Este console muestra el detalle del form enviado

    dispatch({ type: 'CLEAR_CART' });
    setForm(initialFormState);
  };

  // Manejar el clic en "Cancelar Orden"
  const handleCancelOrderClick = () => {
    if (state.products.length === 0) {
      setModalMessage("No tienes productos en tu carrito. No puedes cancelar una orden vacía.");
      setSingleButton(true);
      setShowModal(true);
    } else {
      setModalMessage("¿Estás seguro de que quieres cancelar la orden?");
      setSingleButton(false);
      setShowModal(true);
    }
  };

  // Confirmar la cancelación
  const handleConfirmCancel = () => {
    dispatch({ type: "CLEAR_CART" });
    setShowModal(false);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);

    if (modalMessage === 'Su pedido se registró con éxito') {
      navigate('/');
    }
  };

  return (
    <>
      <CallToAction />
      <CategoryTitleContainer 
      title="Resumen de Órden" 
      />

      {/* Mensaje cuando el carrito está vacío */}
      {state.products.length === 0 && (
        <div className="empty-cart-message">
          <p>No tienes productos en tu carrito :(  ¡Añade algún producto para continuar!</p>
          <div className="empty-cart-illustration">
            <img src="/src/assets/images/icons/cart.svg" alt="Carrito vacío" />
          </div>
        </div>
      )}

      {/* Resumen de productos en el carrito */}
      {state.products.length > 0 && (
        <OrderSummary
          products={products}
          total={total}
          onIncrement={(id) => dispatch({ type: 'INCREMENT_QUANTITY', productId: id })}
          onDecrement={(id) => dispatch({ type: 'DECREMENT_QUANTITY', productId: id })}
          onRemove={(id) => dispatch({ type: 'REMOVE_PRODUCT', productId: id })}
        />
      )}

      {/* Formulario de compra */}
      <OrderForm
        form={form}
        errors={errors}
        districts={districts}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancelOrder={handleCancelOrderClick}
      />

      {/* Modal de confirmación */}
      <Modal
        isOpen={showModal}
        modalMessage={modalMessage}
        onClose={handleCloseModal}
        singleButton={singleButton}
        singleButtonText="Entendido"
        onConfirm={!singleButton ? handleConfirmCancel : undefined}
        confirmText="Sí, cancelar"
        cancelText="No, mantener"
      />
    </>
  );
};

export default ResumenPage;
