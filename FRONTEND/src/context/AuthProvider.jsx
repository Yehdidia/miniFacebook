import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedUser = localStorage.getItem("utilisateur");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (auth) {
            localStorage.setItem("utilisateur", JSON.stringify(auth));
        } else {
            localStorage.removeItem("utilisateur");
        }
    }, [auth]);

    const logout = () => {
        setAuth(null); // Réinitialiser auth
        localStorage.removeItem("utilisateur"); // Supprimer l'utilisateur du stockage local
    };

    return(
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;


/*import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); // S'assurer que l'état existe

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;*/







/*const AuthContext = createContext({});

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