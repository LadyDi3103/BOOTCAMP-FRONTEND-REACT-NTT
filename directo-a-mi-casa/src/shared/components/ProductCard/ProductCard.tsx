import React from "react";
import { Product } from "../../../app/domain/Product";
import { useProductNavigation } from '../../hooks/useProductNavigation';
import { useProducts } from "../../../app/context/ProductContext";
import { useCart } from "../../../app/context/CartContext";

interface ProductCardProps {
  product: Product;
}

/**
 * Componente reutilizable que muestra la tarjeta de un producto.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, thumbnail, price, category, id } = product;
  const { onNavigate } = useProductNavigation();
  const { setSelectedProduct } = useProducts();
  const { addProduct } = useCart();

  if (!title || !thumbnail || !price || !category) {
    console.error("Faltan propiedades en el producto:", product);
  }

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
    <div data-id={id} className="product-card" onClick={handleNavigate}>
      {/* Imagen del producto */}
      <img
        className="product-image"
        src={thumbnail}
        alt={title}
        onError={(e) => {
          console.error("Error al cargar la imagen del producto:", e);
        }}
      />

      {/* Detalles del producto */}
      <div className="product-details">
        <p className="product-name">{title}</p>
        <div className="product-price-wrapper">
          <p className="product-price">S/ {price.toFixed(2)}</p>
        </div>
      </div>

      {/* Botón para agregar al carrito */}
      <button className="add-to-cart" onClick={handleAddToCart}>
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
