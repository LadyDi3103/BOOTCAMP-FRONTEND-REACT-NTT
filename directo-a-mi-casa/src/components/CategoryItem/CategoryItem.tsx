import React from 'react';

// Definimos las propiedades de un ítem de categoría
interface ProductCardProps {
    icon: string;
    alt: string;
    name: string;
}

// Componente individual para cada ítem de categoría
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

// Componente principal para la sección de listado de categorías
const CategoriesList: React.FC = () => {
    // valores fijos deben estar fuera porque no son necesarios volverse a renderizar
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
