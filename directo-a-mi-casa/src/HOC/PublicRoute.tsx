// falta test
import React, { useEffect, useContext, ComponentType } from "react";
import { useNavigate} from "react-router-dom";
import { AuthContext } from "@/app/context/AuthContext";
import { ModuleRoutes } from "@/app/routes/routes";

interface OriginalComponentProps {
  message: string;
}

interface HOCProps {
    hocProp: string;
  }

function withPrivate<T extends OriginalComponentProps>(
  WrappedComponent: ComponentType<T>
) {
  const { loggedUser, checkingLoggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkingLoggedUser && loggedUser) {
      navigate(ModuleRoutes.MarketPage);
    }
  }, [navigate, loggedUser, checkingLoggedUser]);

  if (loggedUser) {
    // Return a new functional component
    const EnhancedComponent: React.FC<Omit<T, keyof HOCProps> & HOCProps> = (
      props
    ) => {
      // Extract HOC-specific props if needed
      const { hocProp, ...restProps } = props as T & HOCProps;

      // Render the original component with additional props
      return <WrappedComponent {...(restProps as T)} />;
    };

    return EnhancedComponent;
  } else {
    return null;
  }
}

export default withPrivate;
