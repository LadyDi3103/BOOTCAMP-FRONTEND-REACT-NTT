import React from 'react';
import { usePageNavigation } from "../../utils/navigationHelpers";

interface CategoryTitleContainerProps {
    title: string; 
  }

const CategoryTitleContainer: React.FC<CategoryTitleContainerProps> =  ({
    title
  })  => {
    const { closePage } = usePageNavigation();
    
    return (
        <div className="category-title-container">
            <h2 className="category-title">{title}</h2>
            <button className="close-btn" id="close-category-btn" onClick={closePage}>
                <img
                    src="/src/assets/images/icons/close-icon.svg"
                    alt="Cerrar categoría"
                />
            </button>

        </div>
    );
};

export default CategoryTitleContainer;
