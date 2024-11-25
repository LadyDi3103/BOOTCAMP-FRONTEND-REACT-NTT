import { FC } from "react";

interface RenderCategoriesProps {
    categories: string[];
    onCategoryClick: (categoryName: string) => void;
    selectedCategory?: string | null;
}

const RenderCategories: FC<RenderCategoriesProps> = ({
    categories,
    onCategoryClick,
}) => {

    if (!categories || categories.length === 0) {
        return <p className="no-categories">No hay categorías disponibles.</p>;
    }

    return (
        <ul className="category-list" role="menu" aria-label="Lista de categorías">
            {categories.map((category) => (
                <li
                    key={category}
                    className='category'
                    onClick={() => onCategoryClick(category)}
                >
                    {category}
                </li>
            ))}
        </ul>
    );
};

export default RenderCategories;