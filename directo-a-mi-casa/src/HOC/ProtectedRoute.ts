import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ProtectedComponent => {

    const WithDisplayName = (props) => {

        const router = useRouter();

        const { loggedUser, checkingLoggedUser } = useContext(AuthContext);
        const [requestedPath, setRequestedPath] = useState(null);

        useEffect(() => {
            if (router?.asPath && !router?.asPath?.includes('[')) {
                setRequestedPath(router?.asPath);
            }
        }, [router]);

        useEffect(() => {
            if (!checkingLoggedUser && !loggedUser) {
                router.push("/login");
            }
        }, [router, loggedUser, checkingLoggedUser]);

        if (typeof window !== "undefined" && loggedUser !== null && requestedPath !== null) {
            if (loggedUser) {
                return <ProtectedComponent {...props} />;
            } else {
                return null;
            }
        }
        return null;
    };

    // set the display name for the HOC
    WithDisplayName.displayName = `withDisplayName(${ProtectedComponent.displayName || ProtectedComponent.name})`;

    return WithDisplayName;
};


export default ProtectedRoute;