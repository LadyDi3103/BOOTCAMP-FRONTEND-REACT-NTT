import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
  loggedUser: object | null;
  checkingLoggedUser: boolean;
  setUserProfile: (user: any) => void;
  userProfile: object | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [checkingLoggedUser, setCheckingLoggedUser] = useState(true);

  const checkUserAuth = async () => {
    setLoggedUser(null);
    /*try {
            setCheckingLoggedUser(true);
            const user = await Auth.currentAuthenticatedUser();
            setLoggedUser(user);
            setCheckingLoggedUser(false);
        } catch (error) {
            setLoggedUser(null);
            setCheckingLoggedUser(false);
            console.warn('El usuario no se encuentra autenticado: ', error);
        }*/
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedUser, checkingLoggedUser, setUserProfile, userProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
