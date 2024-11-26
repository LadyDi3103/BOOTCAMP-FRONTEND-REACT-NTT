import React from 'react';

const CategoryCard: React.FC<{ title: string; description: string }> = ({ title, description }) => {
    return (
        <div className="category-card">
            <div className="text-content">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className="button-container">
                <button className="view-more">Ver más</button>
            </div>
        </div>
    );
};

const CategoriesSection: React.FC = () => {
    // valors fijos fuera
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
        /* los estilos deber'ian estar al mismo nivel del componente para poder reutilizarlos de lo contrario ser'a dificil llevarlo a otro proyecto */
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
