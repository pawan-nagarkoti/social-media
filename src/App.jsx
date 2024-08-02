import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";
import { FindUser, Layout, Profile, Login, Signup, NoFound, UpdateUserProfile, CreatePost, GetAllPost } from "./pages";
import UserProvider from "./services/UserContext";
import ProtectedRoute from "./services/ProtectedRoute";

export default function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="*" element={<NoFound />} />
          {/* <Route path="unauthorized" element={<Unauthorized />} /> */}

          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/" element={<Layout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="find-user" element={<FindUser />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route path="update-post" element={<CreatePost />} />
              <Route path="get-post" element={<GetAllPost />} />
              <Route path="update-profile" element={<UpdateUserProfile />} />
            </Route>
          </Route>

          {/* <Route element={<ProtectedRoute allowedRoles={["admin", "guest"]} />}>
            <Route path="get-post" element={<GetAllPost />} />
            <Route path="update-profile" element={<UpdateUserProfile />} />
          </Route> */}
        </Routes>
      </UserProvider>
    </>
  );
}
