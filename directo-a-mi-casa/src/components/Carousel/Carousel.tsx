import React from 'react';

const Carousel: React.FC = () => {
    return (
        <section className="carousel">
            <img
                src="/src/assets/images/carousel/HP-BANNER-PRINCIPAL-mobile.svg"
                alt="imagen carousel mobile"
                className="carousel-img carousel-mobile"
            />
            <img
                src="/src/assets/images/carousel/baner_desktop.webp"
                alt="imagen carousel desktop"
                className="carousel-img carousel-desktop"
            />
        </section>
    );
};

export default Carousel;
