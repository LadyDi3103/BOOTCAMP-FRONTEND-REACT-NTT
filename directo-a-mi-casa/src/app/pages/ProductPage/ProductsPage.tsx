import CategoryTitleContainer from "../../../shared/components/CategoryTitleContainer";
import './ProductPage.css';
import CallToAction from "../../../components/CallToAction/CallToAction";
import { useProducts } from "../../context/ProductContext";
import ReviewsList from "../../../components/ReviewList";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";


const ProductPage: React.FC = () => {
  const { state, fetchProductDetails } = useProducts();
  const { addProduct } = useCart();

  const selectedProduct = state.selectedProduct;

  useEffect(() => {
    if (selectedProduct?.id) {
      console.log("Fetching details for product ID:", selectedProduct.id);
      fetchProductDetails(selectedProduct.id);
    }
  }, [selectedProduct, fetchProductDetails]);

  if (!state.productDetails) {
    return <p>Cargando detalles del producto...</p>;
  }


  const {
    title,
    description,
    price,
    images,
    category,
    reviews,
  } = state.productDetails;

  return (
    <div>
      <CallToAction />
      <CategoryTitleContainer title={`Detalles del Producto: ${title}`} />
      <div className="producto-container">
        <div className="producto-card">
          <div className="producto-imagen">
            <img
              src={`${images}`}
              alt={title}
              className="description__img"
            />
          </div>
          <div className="producto-detalle">
            <h1 className="producto-title">{title}</h1>
            <p className="producto-description">{description}</p>
            <p className="producto-category">
              <strong>Categoría:</strong> {category}
            </p>
            <div className="producto-price-container">
              <span className="producto-price">S/{price.toFixed(2)}</span>
            </div>
            <button
              className="btn_order__submit"
              onClick={() => addProduct(state.productDetails!)}
              disabled={!state.productDetails}
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
        <div className="producto-reviews">
            <h2>Reseñas del Producto</h2>
            <ReviewsList reviews={reviews} />
          </div>
      </div>
    </div>
  );
};

export default ProductPage;