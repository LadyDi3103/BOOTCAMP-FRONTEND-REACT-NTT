import React from "react";
import { Product } from "../../../app/domain/Product";
import { useProductNavigation } from '../../hooks/ProductNavegate/useProductNavigation';
import { useProducts } from "../../../app/context/ProductContext";
import { useCart } from "../../../app/context/CartContext";
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    title = "Producto sin título",
    thumbnail = "/src/assets/images/placeholder.png",
    price = 0,
    category = "Sin categoría",
    discountPercentage = 0,
  } = product;

  const { onNavigate } = useProductNavigation();
  const { setSelectedProduct } = useProducts();
  const { addProduct } = useCart();

  if (!title || !thumbnail || !price || !category) {
    console.error("Faltan propiedades esenciales en el producto:", product);
  }

  const discountedPrice = discountPercentage
    ? (price - (price * discountPercentage) / 100).toFixed(2)
    : price.toFixed(2);

  /**
   * Maneja el evento de agregar un producto al carrito.
   * @param e Evento del clic.
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addProduct(product);
  };

  /**
   * Maneja la navegación a la página de detalles del producto.
   */
  const handleNavigate = () => {
    setSelectedProduct(product);
    onNavigate(title);
  };

  return (
    <div className="product-card" onClick={handleNavigate}>
      {/* Tag de descuento */}
      {discountPercentage > 0 && (
        <div className="discount-tag">OFF {discountPercentage}%</div>
      )}
      {/* Imagen del producto */}
      <figure className="productCard__image--container">
        <img
          className="product-image"
          src={thumbnail}
          alt={title}
          onError={(e) => {
            console.error("Error al cargar la imagen del producto:", e);
          }}
        />
      </figure>

      {/* Detalles del producto */}
      <div className="product-details">
        <p className="product-name">{title}</p>
        <div className="product-price-wrapper">
          {/* Precio original tachado */}
          {discountPercentage > 0 && (
            <p className="product-original-price">S/ {price.toFixed(2)}</p>
          )}
          {/* Precio con descuento */}
          <p className="product-discounted-price product-price">
            S/ {discountedPrice}
          </p>
        </div>
      </div>

      {/* Botón para agregar al carrito */}
      <button
        className="add-to-cart"
        onClick={handleAddToCart}>
        Agregar
        <img
          src="src/assets/images/icons/white_car.svg"
          alt="Carrito"
          className="cart-icon"
        />
      </button>
    </div>
  );
};

export default ProductCard;
