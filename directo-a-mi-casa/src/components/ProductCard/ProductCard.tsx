import React from "react";
import { Product } from "../../app/domain/Product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onNavigate: (title: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onNavigate }) => {
  const { title, thumbnail, price, category } = product;

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
    onAddToCart(product);
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
            console.error("Error al cargar el icono del carrito:", e);
          }}
        />
      </button>
    </div>
  );
};

export default ProductCard;


// import { useCart } from '../../app/context/CartContext';
// import { Product } from '../../app/domain/Product';
// import { useProductNavigation } from '../../shared/hooks/useProductNavigation';

// interface ProductCardProps {
//     product: Product;
//     onAddToCart: (product: Product) => void;
//     onNavigate: (title: string) => void;
//   }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onNavigate}) => {
//     const { title, thumbnail, price, category } = product;
//     const { toProduct } = useProductNavigation();

//     const handleAddToCart = (e: React.MouseEvent) => {
//         e.stopPropagation(); // Prevenir propagación al contenedor principal
//         onAddToCart(product);
//       };


//     // console.log("Renderizando ProductCard:", product);


//     // Validamos si todas las propiedades necesarias están presentes
//     if (!product) {
//         console.error("El producto no está definido. Revisar datos del producto:", product);
//         return null;
//     }

//     if (!title || !thumbnail || !price || !category) {
//         console.error("Faltan propiedades en el producto:", product);
//     }



//     const handleNavigate = () => {
//         toProduct(title); 
//       };

//     return (
// <>
// <div>
//         {state.products.map(product => (
//           <div key={product.id}>
//             <h2>{product.name}</h2>
//             <p>{product.price}</p>
//             <button onClick={() => handleAddProduct(product)}>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//         <div className="product-card" onClick={handleNavigate}>
//             {/* Imagen del producto */}
//             <img className="product-image" src={thumbnail} alt={title}
//                 onError={(e) => {
//                     console.error("Error al cargar la imagen del producto:", e);
//                 }}
//             />

//             {/* Detalles del producto */}
//             <div className="product-details">
//                 <p className="product-name">{title}</p>
//                 <div className="product-price-wrapper">
//                     <p className="product-price">S/ {price.toFixed(2)}</p>
//                 </div>
//             </div>

//             {/* Botón para agregar al carrito */}
//             <button
//                 className="add-to-cart"
//                 onClick={(e) => {
//                     e.stopPropagation(); // Evitar que el evento afecte a `onClick` de la tarjeta
//                     handleAddProduct();
//                 }}
//             >
//                 Agregar
//                 <img
//                     src="src/assets/images/icons/white_car.svg"
//                     alt="Carrito"
//                     className="cart-icon"
//                     onError={(e) => {
//                         console.error("Error al cargar el icono del carrito:", e);
//                     }}
//                 />
//             </button>
//         </div>
// </>

//     );
// };

// export default ProductCard;
