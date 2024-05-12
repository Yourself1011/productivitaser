import React from "react";
import ReactDOM from "react-dom/client";
import Stop from "./Stop.tsx";
import "../popup/style.css";

ReactDOM.createRoot(document.getElementById("stop")!).render(
  <React.StrictMode>
    <Stop />
  </React.StrictMode>,
);
