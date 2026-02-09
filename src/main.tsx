import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter, Routes, Route } from "react-router";
import Pool from "./pages/pool";
import Truck from "./pages/truck";
import Office from "./pages/office";
import Volume from "./pages/volume";
import Presence from "./pages/presence";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pool" element={<Pool />} />
        <Route path="/truck" element={<Truck />} />
        <Route path="/office" element={<Office />} />
        <Route path="/volume" element={<Volume />} />
        <Route path="/presence" element={<Presence />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
