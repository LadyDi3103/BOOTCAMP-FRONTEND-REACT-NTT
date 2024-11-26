import React, { useEffect } from "react";
import CategoryTitleContainer from "../../../shared/components/CategoryTitleContainer";
import './ProductPage.css';
import CallToAction from "../../../components/CallToAction/CallToAction";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";

// 🔴🩵 verificar ya que no funciona el agregar producto 

const ProductPage: React.FC = () => {
  const { state, clearProductDetails } = useProducts();
  const { addProduct } = useCart();
  const selectedProduct = state.selectedProduct;


  const {
    title = "Producto no encontrado",
    description = "Descripción no disponible",
    price = 0,
    images = "/src/assets/images/placeholder.png", // Imagen de placeholder
    category = "Sin categoría",
    reviews = [],
  } = state.productDetails;

console.log (state.productDetails, '💖💖💖💖💖')

  return (
    <div>
      <CallToAction />
      <CategoryTitleContainer title={`Detalles del Producto: ${title}`} />
      <div className="producto-container">
        <div className="producto-card">
          <div className="producto-imagen">
            <img
              src={`${images}`}
              alt={title}
              className="description__img"
            />
          </div>
          <div className="producto-detalle">
            <h1 className="producto-title">{title}</h1>
            <p className="producto-description">{description}</p>
            <p className="producto-category">
              <strong>Categoría:</strong> {category}
            </p>
            <div className="container_price_btn">
            <div className="producto-price-container">
              <span className="producto-price">S/{price.toFixed(2)}</span>
            </div>
            <button
              className="btn_order__submit"
              onClick={() => addProduct(selectedProduct)}
              disabled={!state.productDetails}
            >
              Agregar al Carrito
            </button>
            </div>

          </div>
        </div>
        <div className="producto-reviews">
          <h2>Reseñas del Producto</h2>
          <div className="review-items-container">
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
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

export default ProductPage;