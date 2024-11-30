import React from 'react';
import { useProducts } from '../../app/context/ProductContext';
import ProductCard from '../../shared/components/ProductCard/ProductCard';

const SpecialOffers: React.FC = () => {
    const { state } = useProducts(); 
    const { specialOffers, loading, error } = state;

    if (loading) return <p>Cargando ofertas...</p>;

    if (error) return <p>Error al cargar ofertas: {error}</p>;

    return (
        <section className="special-offers">
            {/* Encabezado de la sección de ofertas */}
            <div className="offers-header">
                <h2>
                    ¡Sólo por hoy!{' '}
                    <img
                        src="/src/assets/images/icons/clock.svg"
                        alt="reloj"
                        className="clock-icon"
                    />
                </h2>
                {/* Temporizador visual */}
                <div className="timer">
                    <span>
                        05 <small>Hrs</small>
                    </span>
                    <span>
                        05 <small>Min</small>
                    </span>
                    <span>
                        05 <small>Seg</small>
                    </span>
                </div>
            </div>

            {/* Contenedor de los productos en oferta */}
            <div className="products-container">
                {specialOffers && specialOffers.length > 0 ? (
                    // Mapea las ofertas especiales y genera una tarjeta de producto para cada una
                    specialOffers.map((product) => (
                        <ProductCard
                            key={product.id} // Cada producto debe tener un key único
                            product={product} // Pasa el producto como prop al componente ProductCard
                        />
                    ))
                ) : (
                    // Muestra un mensaje si no hay ofertas disponibles
                    <p className="no-offers">No hay ofertas disponibles por ahora.</p>
                )}
            </div>
        </section>
    );
};

export default SpecialOffers;
