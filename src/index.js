import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { UserProvider } from "./Context/Context";
import { AuthProvider } from "./Context/UseAuth";
import { GigProvider } from "./Context/GigContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <GigProvider>
        <App />
      </GigProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
  
);