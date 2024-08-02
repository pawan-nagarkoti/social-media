import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./style/index.scss";

import { useToast } from "./services/hook";
import { ScrollToTop } from "./components";
const { ToastContainerComponent } = useToast();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ScrollToTop />
    <App />
    <ToastContainerComponent />
  </BrowserRouter>
  // </React.StrictMode>
);
