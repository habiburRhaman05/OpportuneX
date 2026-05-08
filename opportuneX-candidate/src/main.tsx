import { createRoot } from "react-dom/client";

import "./index.css";
import AppWrapper from "./AppProvviders";

// Apply dark class to html element for dark-only theme
document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(<AppWrapper />);
