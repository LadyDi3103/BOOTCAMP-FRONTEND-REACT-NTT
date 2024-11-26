/**
 * Componente RenderCategories
 * Este componente muestra una lista de categorías y permite al usuario seleccionar una de ellas.
 */

import { FC } from "react";

// Props para el componente RenderCategories
interface RenderCategoriesProps {
    categories: string[]; // Lista de categorías a renderizar
    onCategoryClick: (categoryName: string) => void; // Callback para manejar el clic en una categoría
    selectedCategory?: string | null; // Categoría seleccionada (opcional)
}

const RenderCategories: FC<RenderCategoriesProps> = ({
    categories,
    onCategoryClick,
}) => {

    // Si no hay categorías disponibles, muestra un mensaje informativo
    if (!categories || categories.length === 0) {
        return <p className="no-categories">No hay categorías disponibles.</p>;
    }

    return (
        // Lista de categorías con roles y etiquetas accesibles para navegadores de asistencia
        <ul className="category-list" role="menu" aria-label="Lista de categorías">
            {categories.map((category) => (
                <li
                    key={category} // Cada elemento debe tener una clave única
                    className="category" // Clase para estilizar cada categoría
                    onClick={() => onCategoryClick(category)} // Manejar clic en la categoría
                >
                    {category} {/* Muestra el nombre de la categoría */}
                </li>
            ))}
        </ul>
    );
};

export default RenderCategories;
