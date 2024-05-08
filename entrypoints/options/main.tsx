import React from "react";
import ReactDOM from "react-dom/client";
import Options from "./Options.tsx";
import "../popup/style.css";

ReactDOM.createRoot(document.getElementById("options")!).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
