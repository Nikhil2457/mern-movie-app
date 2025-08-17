import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Remove the CSS import since styles are in HTML
// import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);