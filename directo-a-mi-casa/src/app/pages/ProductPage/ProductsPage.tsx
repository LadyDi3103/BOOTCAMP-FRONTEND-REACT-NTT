import { useParams } from "react-router-dom";
import CategoryTitleContainer from "../../../shared/components/CategoryTitleContainer";
import './ProductPage.css';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  console.log('NAVEGANDO AL PRODUCTPAGE')
  console.log('productId 🔴', productId)
  return (
    <div>
      <CategoryTitleContainer
        title={'Detalles del Producto'}
      />
      <div className="producto-container">
      <div className="producto-card">
        {/* <div className="producto-imagen">
          <img
            src={product.thumbnail}
            alt={product.title}
            onError={(e) => {
              e.target.src = "/placeholder.png"; // Imagen por defecto si falla
            }}
          />
        </div> */}
        <div className="producto-detalle">
          <h1 className="producto-title">{productId}</h1>
          {/* <p className="producto-description">{product.description}</p>
          <div className="producto-price-container">
            <span className="producto-price">S/{product.price.toFixed(2)}</span>
          </div>
          <button className="btn_order__submit">Agregar al Carrito</button> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductPage;