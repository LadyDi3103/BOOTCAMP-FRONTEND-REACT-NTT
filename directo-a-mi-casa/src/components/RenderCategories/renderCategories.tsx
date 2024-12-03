import { FC, useEffect, useRef } from "react";
import "./RenderCategories.css";
import { useOutsideListener } from "@/shared/hooks/useOutsideListener";

interface RenderCategoriesProps {
    categories: string[];
    onCategoryClick: (categoryName: string) => void;
    selectedCategory?: string | null;
    className?: string,
    setOpen: (status: boolean) => void;
}

const RenderCategories: FC<RenderCategoriesProps> = ({
    categories,
    onCategoryClick,
    className,
    setOpen
}) => {
    const outsideListenerRef = useRef(null); 
    const { outsideListener$ } = useOutsideListener(outsideListenerRef);
    if (!categories || categories.length === 0) {
        return <p className="no-categories">No hay categorías disponibles.</p>;
    }

    useEffect(() => {
        const listener = outsideListener$.subscribe(() => {
            setOpen(false);
        });
        return () => listener.unsubscribe();
    }, [outsideListener$]);

    return (

        <ul ref={outsideListenerRef} className={`category-list ${className}`} role="menu" aria-label="Lista de categorías">
            {categories.map((category) => (
                <li
                    key={category}
                    className="category"
                    onClick={() => onCategoryClick(category)}
                >
                    {category} {/* Muestra el nombre de la categoría */}
                </li>
            ))}
        </ul>
    );
};

export default RenderCategories;
