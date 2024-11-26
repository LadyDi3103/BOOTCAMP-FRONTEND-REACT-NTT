import React from 'react';
import { usePageNavigation } from "../../utils/navigationHelpers";

/**
 * Props que recibe el componente CategoryTitleContainer.
 * - `title`: Título que se muestra en el encabezado.
 */
interface CategoryTitleContainerProps {
    title: string;
}

/**
 * Componente que muestra un contenedor con un título de categoría
 * y un botón para cerrar o salir de la página.
 */
const CategoryTitleContainer: React.FC<CategoryTitleContainerProps> = ({ title }) => {
    // Hook personalizado para manejar la navegación de la página
    const { closePage } = usePageNavigation();

    return (
        <div className="category-title-container">
            {/* Título de la categoría */}
            <h2 className="category-title">{title}</h2>

            {/* Botón para cerrar la categoría */}
            <button
                className="close-btn"
                id="close-category-btn"
                onClick={closePage} 
            >
                <img
                    src="/src/assets/images/icons/close-icon.svg"
                    alt="Cerrar categoría"
                />
            </button>
        </div>
    );
};

export default CategoryTitleContainer;
