import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NoFound() {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
    },
    header: {
      fontSize: "6rem",
      marginBottom: "1rem",
    },
    paragraph: {
      fontSize: "1.5rem",
      marginBottom: "2rem",
    },
    link: {
      fontSize: "1.2rem",
      color: "#007bff",
      textDecoration: "none",
    },
    linkHover: {
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.paragraph}>Page Not Found</p>
      <Link style={styles.link} onClick={() => navigate(-1)}>
        Go back to Home
      </Link>
    </div>
  );
}
