import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log("Auth actuel :", auth); // Debugging
    console.log("Roles autorisés :", allowedRoles); // Debugging

    return(
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet/> 
            : auth?.email
                ?<Navigate to="/unauthorized" state={{ from: location}} replace/>
                :<Navigate to={"/connection"} state={{ from: location}} replace />

        /*auth?.email
            ?<Outlet/>
            :<Navigate to={"/connection"} state={{ from: location}} replace />*/
    );
}

export default RequireAuth;

/*import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedUser = localStorage.getItem("utilisateur");
        return storedUser ? JSON.parse(storedUser) : {};
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}*/
