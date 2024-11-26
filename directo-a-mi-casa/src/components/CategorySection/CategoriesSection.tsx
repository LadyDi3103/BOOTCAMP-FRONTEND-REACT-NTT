/**
 * Componente CategoryCard
 * Representa una tarjeta individual que muestra información de una categoría.
 * 
 * Props:
 * - title: Título de la categoría.
 * - description: Breve descripción de la categoría.
 */

import React from 'react';

const CategoryCard: React.FC<{ title: string; description: string }> = ({ title, description }) => {
    return (
        <div className="category-card">
            {/* Contenido de texto de la tarjeta */}
            <div className="text-content">
                <h2>{title}</h2> {/* Título de la categoría */}
                <p>{description}</p> {/* Descripción de la categoría */}
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
    // Array de categorías para renderizar
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

    return (
        <section className="categories-section">
            {/* Mapeo del array de categorías para renderizar cada tarjeta */}
            {categories.map((category, index) => (
                <CategoryCard
                    key={index} // Clave única basada en el índice
                    title={category.title} // Título de la categoría
                    description={category.description} // Descripción de la categoría
                />
            ))}
        </section>
    );
};

export default CategoriesSection;
