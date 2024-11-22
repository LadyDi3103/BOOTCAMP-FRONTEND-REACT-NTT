import React from "react";
import { Product } from "../../app/domain/Product";
import { useCart } from "../../app/context/CartContext";
import { useProductNavigation } from "../../shared/hooks/useProductNavigation";
import ProductCard from '../ProductCard/ProductCard';

interface ProductCardContainerProps {
  product: Product;
}

const ProductCardContainer: React.FC<ProductCardContainerProps> = ({ product }) => {
  const { toProduct } = useProductNavigation();
  const { dispatch } = useCart();

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_PRODUCT", product });
    console.log("Producto agregado al carrito:", product.title);
  };

  const handleNavigate = (title: string) => {
    toProduct(title);
  };

  return (
    <ProductCard
      product={product}
      onAddToCart={handleAddToCart}
      onNavigate={handleNavigate}
    />
  );
};

export default ProductCardContainer;
