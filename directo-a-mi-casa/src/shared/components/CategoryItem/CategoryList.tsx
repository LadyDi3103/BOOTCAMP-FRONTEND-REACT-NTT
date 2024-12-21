import React from 'react';
import './CategoryList.css';

export const categories = [
    { icon: '/src/assets/images/categories/fruta.svg', alt: 'Frutas', name: 'Frutas' },
    { icon: '/src/assets/images/categories/vegetales.svg', alt: 'Vegetales', name: 'Vegetales' },
    { icon: '/src/assets/images/categories/compras.svg', alt: 'Conservas', name: 'Conservas' },
    { icon: '/src/assets/images/categories/detergente.svg', alt: 'Detergentes', name: 'Detergentes' },
];

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

const CategoriesList: React.FC = () => {
    if (categories.length === 0) {
        return <p className="no-categories">No hay categorias disponibles</p>;
    }

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
