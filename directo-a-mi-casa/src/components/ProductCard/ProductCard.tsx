import { Product } from '../../app/domain/Product';
import { useNavigate } from "react-router-dom";
import { ModuleRoutes } from '../../app/routes';
// import { ModuleRoutes } from "../../app/routes";

interface ProductCardProps {
    product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    console.log("Renderizando ProductCard:", product);
    const navigate = useNavigate();
    const { title, thumbnail, price, category } = product;
    // Validamos si todas las propiedades necesarias están presentes
    if (!product) {
        console.error("El producto no está definido. Revisar datos del producto:", product);
        return null;
    }

    if (!title || !thumbnail || !price || !category) {
        console.error("Faltan propiedades en el producto:", product);
    }

    const handleAddToCart = () => {
        console.log("Producto agregado al carrito:", title);

    };

    const toProduct = (): void => {
        if (!title) {
            console.error("El título del producto no está definido.");
            return;
        }
        console.log("Navegando al producto:", title);
        navigate(`${ModuleRoutes.ProductsPage}/${title}`);
    };

    return (
        <div className="product-card" onClick={toProduct}>
            {/* Imagen del producto */}
            <img className="product-image" src={thumbnail} alt={title}
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
            <button
                className="add-to-cart"
                onClick={(e) => {
                    e.stopPropagation(); // Evitar que el evento afecte a `onClick` de la tarjeta
                    handleAddToCart();
                }}
            >
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
