import React from 'react';

/**
 * Componente Carousel
 * Muestra imágenes en formato de carrusel para dispositivos móviles y de escritorio.
 */
const Carousel: React.FC = () => {
    return (
        <section className="carousel">
            {/* Imagen para dispositivos móviles */}
            <img
                src="/src/assets/images/carousel/HP-BANNER-PRINCIPAL-mobile.svg"
                alt="Imagen para dispositivos móviles"
                className="carousel-img carousel-mobile"
            />

            {/* Imagen para dispositivos de escritorio */}
            <img
                src="/src/assets/images/carousel/baner_desktop.webp"
                alt="Imagen para dispositivos de escritorio"
                className="carousel-img carousel-desktop"
            />
        </section>
    );
};

export default Carousel;
