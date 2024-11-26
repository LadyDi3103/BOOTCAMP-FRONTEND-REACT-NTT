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

  /**
   * Validaciones de las propiedades del producto.
   */
  if (!product) {
    console.error("El producto no está definido.");
    return null; // No renderiza si el producto no está definido.
  }

  if (!title || !thumbnail || !price || !category) {
    console.error("Faltan propiedades en el producto:", product);
  }

  /**
   * Maneja el evento de agregar un producto al carrito.
   * @param e Evento del clic.
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el clic propague al contenedor principal.
    addProduct(product); // Agrega el producto al carrito.
  };

  /**
   * Maneja la navegación a la página de detalles del producto.
   */
  const handleNavigate = () => {
    setSelectedProduct(product); // Establece el producto seleccionado en el contexto.
    onNavigate(title); // Navega a la página de detalles del producto.
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
