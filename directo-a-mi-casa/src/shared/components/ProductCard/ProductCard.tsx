import React from "react";
import { Product } from "../../../app/domain/Product";
import { useCart } from '../../../app/context/CartContext';
import { useProductNavigation  } from '../../hooks/useProductNavigation';
interface ProductCardProps {
  product: Product;
}

// Componente a reutilizar
const ProductCard: React.FC<ProductCardProps> = ({ product}) => {
  const { title, thumbnail, price, category } = product;
  const { onNavigate } = useProductNavigation();
  const { addProduct } = useCart();
  // Validación de propiedades
  if (!product) {
    console.error("El producto no está definido.");
    return null;
  }

  if (!title || !thumbnail || !price || !category) {
    console.error("Faltan propiedades en el producto:", product);
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevenir propagación al contenedor principal
    addProduct(product);
  };

  const handleNavigate = () => {
    onNavigate(title);
  };

  return (
    <div className="product-card" onClick={handleNavigate}>
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
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/path/to/placeholder.png"; 
            console.error("Error al cargar el icono del carrito:", e);
          }}
        />
      </button>
    </div>
  );
};

export default ProductCard;
