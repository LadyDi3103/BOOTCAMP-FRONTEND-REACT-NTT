// import React, { PropsWithChildren } from 'react';
// import ProductCard from './ProductCard/ProductCard';
// import { Product } from '../app/domain/Product';

// interface DynamicProductsProps extends PropsWithChildren {
//   products: Product[];
// }

// const DynamicProducts: React.FC<DynamicProductsProps> = ({ products, children }) => {
//   console.log("DynamicProducts se está renderizando con productos:", products);
//   console.log("children", children)

//   if (!Array.isArray(products) || products.length === 0) {
//     console.log("No hay productos disponibles");
//     return <p>No hay productos disponibles.</p>;
//   }

//   return (
//     <div id="dynamic-products" className="products-container">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//       {children}
//     </div>
//   );
// };

// export default DynamicProducts;
