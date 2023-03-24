//Node Modules
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//Project Files
import App from "./App";
import { UserProvider } from "./state/UserProvider";
import { ModalProvider } from "./state/ModalProvider";
import "./scripts/fontawesome/fontawesomeSetUp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
