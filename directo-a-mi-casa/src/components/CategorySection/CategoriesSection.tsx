import React from 'react';

    const categories = [
        {
            title: 'Electro, hogar y más',
            description: 'Lo último en tecnología, electrohogar, deportes, moda, infantil y más',
        },
        {
            title: 'Supermercado',
            description: 'Recibe tus pedidos en solo 2 horas. ¡Descubre nuestra variedad de productos hoy!',
        },
        {
            title: 'Electro, hogar y más',
            description: 'Lo último en tecnología, electrohogar, deportes, moda, infantil y más',
        },
    ];

const CategoryCard: React.FC<{ title: string; description: string }> = ({ title, description }) => {
    return (
        <div className="category-card">
            {/* Contenido de texto de la tarjeta */}
            <div className="text-content">
                <h2>{title}</h2> 
                <p>{description}</p> 
            </div>

            {/* Botón de acción */}
            <div className="button-container">
                <button className="view-more">Ver más</button>
            </div>
        </div>
    );
};

/**
 * Componente CategoriesSection
 * Muestra una lista de categorías en formato de tarjetas.
 * Utiliza el componente CategoryCard para renderizar cada categoría.
 */
const CategoriesSection: React.FC = () => {


    return (
        <section className="categories-section">
            {categories.map((category, index) => (
                <CategoryCard
                    key={index} 
                    title={category.title} 
                    description={category.description} 
                />
            ))}
        </section>
    );
};

export default CategoriesSection;
