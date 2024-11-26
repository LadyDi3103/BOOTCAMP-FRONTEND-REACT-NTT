/**
 * Componente SpecialOffers
 * Muestra una sección de ofertas especiales disponibles solo por tiempo limitado.
 */

import React from 'react';
import { useProducts } from '../../app/context/ProductContext';
import ProductCard from '../../shared/components/ProductCard/ProductCard';

const SpecialOffers: React.FC = () => {
    const { state } = useProducts(); // Obtiene el estado del contexto de productos
    const { specialOffers, loading, error } = state; // Desestructuración para acceder a las ofertas especiales, estado de carga y errores

    // Si los datos están cargando, muestra un mensaje de carga
    if (loading) return <p>Cargando ofertas...</p>;

    // Si hubo un error al cargar los datos, muestra el mensaje de error
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
