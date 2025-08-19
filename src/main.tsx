import _React from "react";
import "./style.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";

document.body.innerHTML = `<div id="app"></div>`;

const app = document.getElementById("app");

if (app) {
  const root = createRoot(app);
  root.render(App());
}
