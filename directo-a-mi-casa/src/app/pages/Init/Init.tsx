import ProductCard from "../../../shared/components/ProductCard/ProductCard";
import CategoryTitleContainer from "../../../shared/components/CategoryTitleContainer";
import CallToAction from "../../../components/CallToAction/CallToAction";
import { useProducts } from "../../context/ProductContext";
// import "./Init.css";

const Init: React.FC = () => {
  const { state } = useProducts();
  const { products = [], loading, error } = state;

  return (
    <>
      <CallToAction />
      {/* Mensaje de carga */}
      {loading && <div className="loader">Cargando productos...</div>}

      {/* Mensaje de error */}
      {error && <div className="error-message">{error}</div>}

      {/* Mostrar productos si no hay error y se cargaron datos */}
      {!loading && !error && (

        <div>
          <CategoryTitleContainer title={`${products.length || 0} Productos`} />
          {products.length > 0 ? (
            <div className="products-container">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products-message">
              No hay productos disponibles.
            </div>
          )}
        </div>
      )}
    </>
  );
};


export default Init;
