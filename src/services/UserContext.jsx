// UserContext.js
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ roles: [], loading: true });

  // const fetchUserRoles = useCallback(async () => {
  //   const token = Cookies.get("accessToken");
  //   if (token) {
  //     try {
  //       const response = await _get("/users/roles");
  //       setUser({ roles: response.data.roles, loading: false });
  //     } catch (error) {
  //       console.error("Failed to fetch user roles:", error);
  //       setUser({ roles: [], loading: false });
  //     }
  //   } else {
  //     setUser({ roles: [], loading: false });
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchUserRoles();
  // }, [fetchUserRoles]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
