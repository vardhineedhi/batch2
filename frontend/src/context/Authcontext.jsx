import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [currentUser, setCurrentUser] = useState(() => {
  const storedUser = localStorage.getItem("learnhub-user");
  const storedToken = localStorage.getItem("learnhub-token");
  return storedUser && storedToken
    ? {
        ...JSON.parse(storedUser),
        _id: JSON.parse(storedUser).id || JSON.parse(storedUser)._id,
        token: storedToken,
      }
    : null;
});


  const login = (user, token) => {
    localStorage.setItem("learnhub-token", token);
    localStorage.setItem("learnhub-user", JSON.stringify(user));
    setCurrentUser({ ...user, token }); // ✅ include token in currentUser
  };

  const logout = () => {
    localStorage.removeItem("learnhub-token");
    localStorage.removeItem("learnhub-user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


