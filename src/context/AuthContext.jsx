import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("kadecho_user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("kadecho_token");
  });

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);

    localStorage.setItem(
      "kadecho_user",
      JSON.stringify(data.user)
    );

    localStorage.setItem(
      "kadecho_token",
      data.token
    );
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("kadecho_user");
    localStorage.removeItem("kadecho_token");
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}