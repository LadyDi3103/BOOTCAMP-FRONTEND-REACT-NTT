import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CategoryTitleContainer from "../../../shared/components/CategoryTitleBar/CategoryTitleBar";
import './ResumenPage.css';
import { Product } from '../../domain/Product';
import { useDistricts } from '@/shared/hooks/Districts/useDistricts';
import CallToAction from '../../../shared/components/CallToAction/CallToAction';
import { FormState } from '../../domain/FormState';
import Modal from '../../../shared/components/Modal/Modal';
import OrderSummary from '../../../components/OrderSummary/OrderSumary';
import OrderForm from '../../../components/OrderForm/OrderForm';
import { useNavigate } from "react-router-dom";
import withAuth from "@/HOC/withAuth";

const initialFormState: FormState = {
  nombre: '',
  apellidos: '',
  distrito: '',
  direccion: '',
  referencia: '',
  celular: '',
};


const normalizeProduct = (product: Partial<Product>): Product => ({
  id: product.id || 0,
  title: product.title || '',
  name: product.name || '',
  description: product.description || '',
  price: product.price || 0,
  thumbnail: product.thumbnail || '',
  category: product.category || '',
  quantity: Number(product.quantity) || 0,
  discountPercentage: product.discountPercentage || 0,
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

  const products = state.products.map(normalizeProduct);

  const total = products
    .reduce((sum, product) => sum + product.price * (product.quantity || 0), 0)
    .toFixed(2);

  const validateField = (fieldName: string, value: string): string | null => {
    switch (fieldName) {
      case "nombre":
        if (!value.trim()) return "Por favor, ingresa tu nombre.";
        if (value.trim().length < 2)
          return "El nombre debe tener al menos 2 caracteres.";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "El nombre solo puede contener letras y espacios.";
        return null;

      case "apellidos":
        if (!value.trim()) return "Por favor, ingresa tus apellidos.";
        if (value.trim().length < 2)
          return "Los apellidos deben tener al menos 2 caracteres.";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Los apellidos solo pueden contener letras y espacios.";
        return null;

      case "celular":
        if (!value.trim()) return "Por favor, ingresa tu número de celular.";
        if (!/^[0-9]{9}$/.test(value))
          return "El número de celular debe tener 9 dígitos.";
        return null;

      case "distrito":
        return value ? null : "Por favor, selecciona tu distrito de entrega.";

      case "direccion":
        if (!value.trim()) return "Por favor, ingresa tu dirección exacta.";
        if (value.trim().length < 5)
          return "La dirección debe tener al menos 5 caracteres.";
        return null;

      case "referencia":
        if (!value.trim())
          return "Por favor, proporciona una referencia para facilitar la entrega.";
        if (value.trim().length < 5)
          return "La referencia debe tener al menos 5 caracteres.";
        return null;

      default:
        return null;
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (products.length === 0) {
      setModalMessage(
        "Su carrito está vacío. Por favor, añada productos antes de realizar el pedido."
      );
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
      setModalMessage(
        "Por favor, complete todos los campos del formulario correctamente."
      );
      setSingleButton(true);
      setShowModal(true);
      return;
    }

    setModalMessage("Su pedido se registró con éxito");
    setSingleButton(true);
    setShowModal(true);

    // 🔴 Este console muestra el detalle del form enviado

    dispatch({ type: "CLEAR_CART" });
    setForm(initialFormState);
  };

  const handleCancelOrderClick = () => {
    if (state.products.length === 0) {
      setModalMessage(
        "No tienes productos en tu carrito. No puedes cancelar una orden vacía."
      );
      setSingleButton(true);
      setShowModal(true);
    } else {
      setModalMessage("¿Estás seguro de que quieres cancelar la orden?");
      setSingleButton(false);
      setShowModal(true);
    }
  };

  const handleConfirmCancel = () => {
    dispatch({ type: "CLEAR_CART" });
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    if (modalMessage === "Su pedido se registró con éxito") {
      navigate("/");
    }
  };

  return (
    <>
      <CallToAction />
      <CategoryTitleContainer title="Resumen de Órden" />

      {/* Mensaje cuando el carrito está vacío */}
      {state.products.length === 0 && (
        <div className="empty-cart-message">
          <p>
            No tienes productos en tu carrito :( ¡Añade algún producto para
            continuar!
          </p>
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
          onIncrement={(id) =>
            dispatch({ type: "INCREMENT_QUANTITY", productId: id })
          }
          onDecrement={(id) =>
            dispatch({ type: "DECREMENT_QUANTITY", productId: id })
          }
          onRemove={(id) => dispatch({ type: "REMOVE_PRODUCT", productId: id })}
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
      <Modal isOpen={showModal}>
        <div className="modal__header">
          <h3>{modalMessage}</h3>
        </div>
        <div className="modal__actions">
          {singleButton ? (
            <button
              className="btn__order btn_order__submit"
              onClick={handleCloseModal}
            >
              Entendido
            </button>
          ) : (
            <>
              {!singleButton && (
                <button
                  className="btn__order btn_order__cancelar"
                  onClick={handleConfirmCancel}
                >
                  Sí, cancelar
                </button>
              )}
              <button
                className="btn__order btn_order__submit"
                onClick={handleCloseModal}
              >
                No, mantener
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default withAuth(ResumenPage);