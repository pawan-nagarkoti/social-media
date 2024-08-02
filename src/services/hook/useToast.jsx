import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useToast() {
  const toastOptions = {
    position: "top-right",
    theme: "colored",
  };
  const showToast = (message, toasterTheme) => {
    switch (toasterTheme) {
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      default:
        break;
    }
  };

  return {
    showToast,
    ToastContainerComponent: () => <ToastContainer pauseOnHover closeOnClick />,
  };
}
