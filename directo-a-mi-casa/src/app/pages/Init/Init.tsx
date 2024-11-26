import React from "react";
import ProductCard from "../../../shared/components/ProductCard/ProductCard";
import CategoryTitleContainer from "../../../shared/components/CategoryTitleContainer";
import CallToAction from "../../../components/CallToAction/CallToAction";
import { useProducts } from "../../context/ProductContext";

/**
 * Componente Init
 * Renderiza una lista de productos con un título, un mensaje de carga o error si corresponde.
 */
const Init: React.FC = () => {
  const { state } = useProducts();
  const { loading, error } = state;

  return (
    <>
      {/* Sección de llamado a la acción */}
      <CallToAction />

      {/* Indicador de carga */}
      {loading && <div className="loader">Cargando productos...</div>}

      {/* Mensaje de error */}
      {error && <div className="error-message">{error}</div>}

      {/* Renderizado de productos */}
      {!loading && !error && (
        <div>
          {/* Título con el número de productos disponibles */}
          <CategoryTitleContainer title={`${state.products.length || 0} Productos`} />

          {/* Si hay productos, renderizarlos; de lo contrario, mostrar un mensaje */}
          {state.products.length > 0 ? (
            <div className="products-container">
              {state.products.map((product) => (
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
