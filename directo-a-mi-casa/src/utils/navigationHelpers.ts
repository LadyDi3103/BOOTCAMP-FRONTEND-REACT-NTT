import { useNavigate } from "react-router-dom";

/**
 * Hook que maneja la navegación de la página.
 */
export const usePageNavigation = () => {
  const navigate = useNavigate();

  /**
   * Cierra la página volviendo a la anterior en el historial.
   */
  const closePage = () => {
    console.log("Cerrando página...");
    navigate('/');
  };

  /**
   * Redirige al usuario a una ruta específica.
   * @param path Ruta de destino
   */
  const navigateTo = (path: string) => {
    console.log(`Navegando a ${path}...`);
    navigate(path); // Redirige a la ruta especificada
  };

  return { closePage, navigateTo };
};

/**
 * Función que maneja el cierre de sesión.
 */
export const useAuth = () => {
  const navigate = useNavigate();

  /**
   * Elimina el token del almacenamiento y redirige al usuario al login.
   */
  const logout = () => {
    console.log("Cerrando sesión...");
    // Elimina tokens o información de autenticación
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    // Redirige al usuario a la página de login
    navigate("/login");
  };

  return { logout };
};
