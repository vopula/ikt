import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardUser from "./pages/DashboardUser";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk halaman Login */}
        <Route path="/" element={<Login />} />
        {/* Route untuk halaman Dashboard */}
        <Route path="/dashboardUser" element={<DashboardUser />} />
      </Routes>
    </Router>
  );
}

export default App;
