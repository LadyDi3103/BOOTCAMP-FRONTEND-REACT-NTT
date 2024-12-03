import React from "react";
import "./SpecialOffers.css"; 
import ProductCard from "../../shared/components/ProductCard/ProductCard";
import { usePagination } from "@/shared/hooks/Pagination/usePagination";
import ReusablePagination from "@/shared/components/Pagination/Pagination";

const PAGE_COUNT = 6;

const SpecialOffers: React.FC = () => {
    const { requestPage, items, currentPage, loading, totalPages } =
        usePagination(PAGE_COUNT);

    if (loading) return <p>Cargando ofertas...</p>;

    return (
        <section className="special-offers">
            {/* Encabezado de la sección de ofertas */}
            <div className="offers-header">
                <h2>
                    ¡Sólo por hoy!{" "}
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
                {items && items.length > 0 ? (
                    items.map((product) => (
                        <ProductCard
                            key={product.id} 
                            product={product} // Pasa el producto como prop al componente ProductCard
                        />
                    ))
                ) : (
                    <p className="no-offers">No hay ofertas disponibles por ahora.</p>
                )}
            </div>

                <ReusablePagination
                    totalPages={totalPages}
                    requestPage={requestPage}
                    currentPage={currentPage}
                    pageCount={PAGE_COUNT}
                />

        </section>
    );
};

export default SpecialOffers;
