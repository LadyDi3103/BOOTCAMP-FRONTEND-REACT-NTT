// Funciones comunes como filtros, ordenamiento, etc.
import { Product } from '../app/domain/Product';
/**
 * Filtra productos por título según el texto ingresado.
 * @param {Product[]} products- Lista de productos.
 * @param {string} query - Texto ingresado por el usuario.
 * @returns {Product[]} - Productos filtrados.
 */
export const filterProducts = (products: Product[], query: string): Product[] => {
    return products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );
};