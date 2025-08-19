import React, { StrictMode } from "react";
import { App } from "./App.tsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
