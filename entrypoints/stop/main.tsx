import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../popup/style.css";

ReactDOM.createRoot(document.getElementById("stop")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
