import { createContext } from "react";

export const AdminAuthContext = createContext({
  isLoggedIn: false,
  token: null,
  admin: null,
  login: () => {},
  logout: () => {},
});

