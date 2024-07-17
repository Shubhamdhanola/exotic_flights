import { createContext } from "react";

const AdminAuthContext = createContext({
  isLoggedIn: false,
  token: null,
  admin: null,
  login: () => {},
  logout: () => {},
});

export { AdminAuthContext };
