import React from "react";

export default function MiddleComponent({ children }) {
  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ width: "250px", height: "100vh", position: "fixed" }}>
      {children}
    </div>
  );
}
