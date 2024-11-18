// Funciones comunes como filtros, ordenamiento, etc.

/**
 * Filtra productos por título según el texto ingresado.
 * @param {Array} products - Lista de productos.
 * @param {string} query - Texto ingresado por el usuario.
 * @returns {Array} - Productos filtrados.
 */
export const filterProducts = (products, query) => {
    return products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );
};