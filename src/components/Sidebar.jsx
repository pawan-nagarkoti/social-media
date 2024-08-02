import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "../components";
import { navItems } from "../utils/constant";

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogoutBtn = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    navigate("/login");
    window.location.reload();
  };
  return (
    <>
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems?.map(({ label, path }, index) => (
          <li key={index}>
            <NavLink to={path} className="nav-link" exact="true">
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <Button className="btn btn-danger mt-4" onClick={handleLogoutBtn}>
        Logout
      </Button>
    </>
  );
}
