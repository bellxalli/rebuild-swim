import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Resources from "./pages/Resources";

export default function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "1rem",
          display: "flex",
          gap: "1rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/assessment">Assessment</Link>
        <Link to="/resources">Resources</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  );
}