import { useParams } from "react-router-dom";

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
console.log('NAVEGANDO AL PRODUCTPAGE')
  return (
    <div>
        
      <h1 className="category-title">Detalles del Producto</h1>
      <p className="category-title">Estás viendo el producto: {productId}</p>
    </div>
  );
};

export default ProductPage;