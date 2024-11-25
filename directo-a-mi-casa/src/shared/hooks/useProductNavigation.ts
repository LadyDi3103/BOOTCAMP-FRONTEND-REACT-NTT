import { useNavigate } from "react-router-dom";
import { ModuleRoutes } from "../../app/routes";

/**
 * Hook para navegar a la página de un producto específico.
 * @returns Una función `toProduct` que permite navegar usando el título del producto.
 */
export const useProductNavigation = () => {
  const navigate = useNavigate();

  const onNavigate = (productTitle: string): void => {
    if (!productTitle || productTitle.trim() === "") {
      console.error("El identificador del producto no está definido.");
      return;
    }
    const formattedProductTitle = productTitle.replace(/\s+/g, '-');
    console.log("Navegando al producto:", formattedProductTitle);
    navigate(`${ModuleRoutes.ProductsPage}/${encodeURIComponent(formattedProductTitle)}`);
  };

  return { onNavigate };
};
