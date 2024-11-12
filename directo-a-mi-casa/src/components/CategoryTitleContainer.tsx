import React from 'react';

const CategoryTitleContainer: React.FC = () => {
    return (
        <div id="category-title-container" className="category-title-container">
            <button className="close-btn" id="close-category-btn">
                <img
                    src="/src/assets/images/icons/close-icon.svg"
                    alt="Cerrar categoría"
                />
            </button>
        </div>
    );
};

export default CategoryTitleContainer;
