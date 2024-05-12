import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { UserProvider } from "./Context/Context";
import { AuthProvider } from "./Context/UseAuth";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
  
);