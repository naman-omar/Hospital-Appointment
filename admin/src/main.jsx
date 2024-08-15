import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";

const AppWrapper = () => {
  return (
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);