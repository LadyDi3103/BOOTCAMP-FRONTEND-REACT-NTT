import { useEffect, useState } from "react";
import { productRequest } from "../../proxy/fetchProducts";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Product } from '../../domain/Product';
// import "./Init.css";

const Init: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Estado inicial como un array vacío
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga

  const getProducts = async () => {
    try{
      console.log("Iniciando la solicitud de productos...");
      setLoading(true); // Activar estado de carga
      const data: Product[] = await productRequest.fetchAllProducts();
      console.log("Productos recibidos INIT:", data);
      setProducts(data);
      setError(null);
    } catch (error){
      console.error("Error al obtener los productos:", error);
      setError("No se pudieron cargar los productos. Por favor, inténtelo más tarde.");
    } finally {
      setLoading(false); // Desactiva estado de carga
    }
  };

  useEffect(() => {
    console.log("Componente Init montado.");
    getProducts();
  }, []);

  return (
    <>
      {/* Mensaje de carga */}
      {loading && <div>Cargando productos...</div>}

      {/* Mensaje de error */}
      {error && <div className="error-message">{error}</div>}

      {/* Mostrar productos si no hay error y se cargaron datos */}
      {!loading && !error && products.length > 0 && (

        <div className="products-container">
        <h2 className="init-title">Lista de Productos</h2>
          {products.map((product) => (
            <ProductCard 
            key={product.id} product={product} 
            />
          ))}
        </div>
      )}
 
      {/* Mensaje si no hay productos disponibles */}
      {!loading && !error && products.length === 0 && (
        <div className="no-products-message">No hay productos disponibles.</div>
      )}
    </>
  );
};

export default Init;
