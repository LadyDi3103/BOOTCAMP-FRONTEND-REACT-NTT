import React from "react";
import { Product } from "../../app/domain/Product";
import ProductCardContainer from "../CardContainer/ProductCardContainer";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products.length) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCardContainer key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
