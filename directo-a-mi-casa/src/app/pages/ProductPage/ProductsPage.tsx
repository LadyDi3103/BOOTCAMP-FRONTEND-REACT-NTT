import React from "react";
import CategoryTitleContainer from "../../../shared/components/CategoryTitleBar/CategoryTitleBar";
import './ProductPage.css';
import CallToAction from "../../../shared/components/CallToAction/CallToAction";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import { Review } from "../../domain/ProductDetail";
import withAuth from "@/HOC/withAuth";

/**
 * Componente ProductPage
 * Renderiza los detalles del producto seleccionado, incluyendo reseñas y un botón para agregar al carrito.
 */
const ProductPage: React.FC = () => {
  const { state } = useProducts();
  const { addProduct } = useCart();

const selectedProduct = state?.selectedProduct || null;
const productDetails = state.productDetails;

  const {
    title = "Producto no encontrado",
    description = "Descripción no disponible",
    price = 0,
    images = "/src/assets/images/placeholder.png", 
    category = "Sin categoría",
    reviews = [],
  } = productDetails;

  return (
    <div>
      <CallToAction />
      {/* Título de la página con el nombre del producto */}
      <CategoryTitleContainer title={`Detalles del Producto: ${title}`} />
      <div className="producto-container">
        <div className="producto-card">
          {/* Imagen del producto */}
          <div className="producto-imagen">
            <img
              src={`${images}`}
              alt={title}
              className="description__img"
            />
          </div>
          <div className="producto-detalle">
            {/* Detalles del producto */}
            <h1 className="producto-title">{title}</h1>
            <p className="producto-description">{description}</p>
            <p className="producto-category">
              <strong>Categoría:</strong> {category}
            </p>
            <div className="container_price_btn">
              <div className="producto-price-container">
                <span className="producto-price">S/{price.toFixed(2)}</span>
              </div>
              {/* Botón para agregar al carrito */}
              <button
                className="btn_order__submit"
                onClick={() => addProduct(selectedProduct!)}
                disabled={!state.productDetails}
              >
                Agregar
                <img
                  src="/src/assets/images/icons/white_car.svg"
                  alt="Carrito"
                  className="cart-icon"
                />
              </button>
            </div>
          </div>
        </div>
        {/* Sección de reseñas del producto */}
        <div className="producto-reviews">
          <h2>Reseñas del Producto</h2>
          <div className="review-items-container">
            {reviews && reviews.length > 0 ? (
              reviews.map((review: Review, index: number) => (
                <div className="review-item" key={index}>
                  <div className="review-author">{review.reviewerName}</div>
                  <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                  <div className="review-comment">{review.comment}</div>
                  <div className="review-rating">
                    <span>⭐</span>
                    <span>{review.rating}/5</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-reviews">No hay reseñas disponibles para este producto.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProductPage);