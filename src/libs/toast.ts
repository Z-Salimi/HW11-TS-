import Toastify from 'toastify-js';

export const toast = (text: string, mode: "success" | "error" = "error"): void => {
  Toastify({
    text,
    duration: 3000,
    close: true,
    position: "right",
    style: {
      background: mode === "success" ? "green" : "brown",
      fontSize: "16px",
      fontWeight: "500",
      borderRadius: "10px",
      width: "300px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white", 
      border: "1px solid black",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      zIndex: "9999",
      position: "fixed",
      top: "50%",
      left: "10%",
      transform: "translate(-50%, -50%)",
    }
  }).showToast();
};
