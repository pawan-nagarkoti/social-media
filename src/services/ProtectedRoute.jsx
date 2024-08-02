// ProtectedRoute.js
import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "./UserContext";
// import { _get } from "../services/api";

const ProtectedRoute = ({ allowedRoles }) => {
  // const { user } = useContext(UserContext);
  // console.log("user", user);

  // if (user.loading) {
  //   return <p>Loading...</p>; // Or a loading spinner
  // }

  const token = Cookies.get("accessToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const getRoleFromCookies = Cookies.get("role");
  const roles = [getRoleFromCookies];
  console.log(getRoleFromCookies, allowedRoles);
  // const hasAccess = allowedRoles.some((role) => roles?.includes(role));

  // // const hasAccess = allowedRoles.some((role) => user?.roles?.includes(role));

  // if (!hasAccess) {
  //   <h1>Not access</h1>;
  //   // return <Navigate to="/unauthorized" />;
  // }

  if (!allowedRoles.includes(getRoleFromCookies)) {
    return <h1>not access</h1>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
