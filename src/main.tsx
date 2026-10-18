import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/noto-color-emoji";

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
