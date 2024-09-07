import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/ThemeContext";

const root = document.getElementById("root");

const rootRenderer = createRoot(root);
rootRenderer.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
