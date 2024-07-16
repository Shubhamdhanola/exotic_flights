import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    user: null,
    login: () => {},
    logout: () => {}
});

const AdminAuthContext = createContext({
    isLoggedIn: false,
    token: null,
    admin: null,
    login: () => {},
    logout: () => {}
});

export {AuthContext, AdminAuthContext} 