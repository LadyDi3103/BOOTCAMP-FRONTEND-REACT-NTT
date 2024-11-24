import React from 'react';
import { useProducts } from '../app/context/ProductContext';
import ProductCard from '../shared/components/ProductCard/ProductCard';


const SpecialOffers: React.FC = () => {
    const { state } = useProducts();
    const { specialOffers, loading, error } = state;

    if (loading) return <p>Cargando ofertas...</p>;
    if (error) return <p>Error al cargar ofertas: {error}</p>;

    return (
        <section className="special-offers">
          <div className="offers-header">
            <h2>
              ¡Sólo por hoy!{' '}
              <img
                src="/src/assets/images/icons/clock.svg"
                alt="reloj"
                className="clock-icon"
              />
            </h2>
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
          <div className="products-container">
            {specialOffers && specialOffers.length > 0 ? (
              specialOffers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <p>No hay ofertas disponibles.</p>
            )}
          </div>
        </section>
      );
    };

export default SpecialOffers;
