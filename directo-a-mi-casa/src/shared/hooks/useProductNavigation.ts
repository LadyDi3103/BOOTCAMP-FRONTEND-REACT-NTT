import { useNavigate } from "react-router-dom";
import { ModuleRoutes } from "../../app/routes";

/**
 * Navega a la página de un producto específico.
 * @param productTitle ID o título del producto que se usará en la URL.
 */
export const useProductNavigation = () => {
  const navigate = useNavigate();

  const toProduct = (productTitle: string): void => {
    if (!productTitle || productTitle.trim() === "") {
      console.error("El identificador del producto no está definido.");
      return;
    }
    const formattedProductTitle = productTitle.replace(/\s+/g, '-');
    console.log("Navegando al producto:", formattedProductTitle);
    navigate(`${ModuleRoutes.ProductsPage}/${encodeURIComponent(formattedProductTitle)}`);
  };

  return { toProduct };
};
