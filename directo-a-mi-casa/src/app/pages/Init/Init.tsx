import { useEffect, useState } from "react";
import { productRequest } from "../../services/fetchProducts";
import ProductCard from "../../../shared/components/ProductCard/ProductCard";
import { Product } from "../../domain/Product";
import CategoryTitleContainer from "../../../shared/components/CategoryTitleContainer";
import CallToAction from "../../../components/CallToAction/CallToAction";
// import "./Init.css";

const Init: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Estado inicial valor vacio
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga

  /**
   * Obtiene los productos desde el servicio `productRequest`.
   */
  const getProducts = async () => {
    try {
      console.log("Iniciando la solicitud de productos...");
      setLoading(true); // Activar estado de carga
      const data: Product[] = await productRequest.fetchAllProducts();
      console.log("Productos recibidos INIT:", data);
      setProducts(data);
      setError(null);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setError(
        "No se pudieron cargar los productos. Por favor, inténtelo más tarde."
      );
    } finally {
      setLoading(false); // Desactiva estado de carga
    }
  };

  /**
   * Llama a `getProducts` al montar el componente.
   */
  useEffect(() => {
    console.log("Componente Init montado.");
    getProducts();
  }, []);

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
          <CategoryTitleContainer title={`${products.length} Productos`} />
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
