import { Product } from "../../app/domain/Product";

/**
 * Filtra productos por título según el texto ingresado.
 * @param products Lista de productos.
 * @param query Texto ingresado por el usuario.
 * @returns Productos filtrados.
 */
export const filterProducts = (products: Product[], query: string): Product[] => {
  if (!query) return products;
  
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Devuelve los N productos con los precios más bajos.
 * @param products El array de productos de donde filtrar.
 * @param n El número de productos a devolver.
 * @returns Un array de productos con los precios más bajos.
 */
export const getTopNLowestPricedProducts = (products: Product[], n: number): Product[] => {
  if (!products || products.length === 0) {
    return [];
  }

  return products
    .slice() // Crea una copia para no mutar el array original
    .sort((a, b) => a.price - b.price)
    .slice(0, n);
};