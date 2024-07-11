import React from "react";
import ReactDOM from "react-dom/client";
import Standup from "./Standup.tsx";
import "../popup/style.css";

ReactDOM.createRoot(document.getElementById("standup")!).render(
  <React.StrictMode>
    <Standup />
  </React.StrictMode>,
);
