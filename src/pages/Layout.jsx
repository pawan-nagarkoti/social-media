import React from "react";
import { Sidebar, FollowListCard } from "../components";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-2 bg-light sidebar">
          <div className="d-flex flex-column p-3">
            <Sidebar />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-lg-7 main-content">
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        {/* Follow List Card */}
        <div className="col-lg-3 bg-light follow-list">
          <div className="p-3">
            <FollowListCard />
          </div>
        </div>
      </div>
    </div>
  );
}
