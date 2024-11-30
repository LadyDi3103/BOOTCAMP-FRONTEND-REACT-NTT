import { useNavigate } from "react-router-dom";
import { ModuleRoutes } from "../../app/routes/routes";

/**
 * Hook que maneja la navegación de la página.
 */
export const usePageNavigation = () => {
  const navigate = useNavigate();


  const closePage = () => {
    navigate("/");
  };

  const navigateTo = (path: ModuleRoutes) => {
    navigate(path); 
  };

  return { closePage, navigateTo };
};

export const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate(ModuleRoutes.Login);
  };

  return { logout };
};
