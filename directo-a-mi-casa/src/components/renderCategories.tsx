import { FC } from "react";
import { Category} from "../app/domain/Category";

interface RenderCategoriesProps {
    categories: Category[];
    onCategoryClick: (categoryName: string) => void;
    selectedCategory?: string | null;
}

const RenderCategories: FC<RenderCategoriesProps> = ({
    categories,
    onCategoryClick,
    selectedCategory,
}) => {

    if (!categories || categories.length === 0) {
        return <p className="no-categories">No hay categorías disponibles.</p>;
    }
    return (
        <ul className="category-list" role="menu" aria-label="Lista de categorías">
            {categories.map((category) => (
                <li
                    key={category.id}
                    className={`category-item ${
                        selectedCategory === category.name ? "selected-category" : ""
                        }`}
                    onClick={() => onCategoryClick(category.name)}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && onCategoryClick(category.url)}
                    aria-label={`Categoría ${category.name}`}
                >
                    {category.name}
                </li>
            ))}
        </ul>


    );
};

export default RenderCategories;