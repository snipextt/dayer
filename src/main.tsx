// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import axios from "axios";
import { ThemeModeProvider } from "./providers/ThemeModeProvider.tsx";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ThemeModeProvider>
    <App />
  </ThemeModeProvider>,
  // </React.StrictMode>,
);
