import React from 'react';

/**
 * Componente ProductCard
 * Muestra un ítem individual de categoría con ícono y nombre.
 */
interface ProductCardProps {
    icon: string;
    alt: string;
    name: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ icon, alt, name }) => {
    return (
        <div className="category-item">
            <div className="category-icon">
                <img src={icon} alt={alt} />
            </div>
            <p>{name}</p>
        </div>
    );
};

/**
 * Componente CategoriesList
 * Renderiza una lista de categorías utilizando el componente ProductCard.
 */
const CategoriesList: React.FC = () => {
    const categories = [
        { icon: '/src/assets/images/categories/fruta.svg', alt: 'Frutas', name: 'Frutas' },
        { icon: '/src/assets/images/categories/vegetales.svg', alt: 'Vegetales', name: 'Vegetales' },
        { icon: '/src/assets/images/categories/compras.svg', alt: 'Conservas', name: 'Conservas' },
        { icon: '/src/assets/images/categories/detergente.svg', alt: 'Detergentes', name: 'Detergentes' },
    ];

    return (
        <section className="categories">
            {categories.map((category, index) => (
                <ProductCard
                    key={index}
                    icon={category.icon}
                    alt={category.alt}
                    name={category.name}
                />
            ))}
        </section>
    );
};

export default CategoriesList;
