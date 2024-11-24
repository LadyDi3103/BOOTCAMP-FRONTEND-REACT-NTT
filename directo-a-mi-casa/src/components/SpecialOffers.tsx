import React, { useState, useEffect } from 'react';
// import { useCart } from '../app/context/CartContext';
import { useProducts } from '../app/context/ProductContext';
import { Product } from '../app/domain/Product';
import { getTopNLowestPricedProducts } from '../utils/helpers';
import ProductCard from '../shared/components/ProductCard/ProductCard';


const SpecialOffers: React.FC = () => {
    // const { state } = useCart();
    const { products } = useProducts();
    const [offers, setOffers] = useState<Product[]>([]);

    // console.log('Productos en el carrito:', state.products);

    useEffect(() => {
        const topOffers = getTopNLowestPricedProducts(products, 10);
        setOffers(topOffers);
    }, [products]);

    return (
        <>
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
                    {offers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </>

    );
};

export default SpecialOffers;
