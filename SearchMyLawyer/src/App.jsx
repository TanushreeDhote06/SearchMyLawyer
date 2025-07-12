import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LawyerRegister from "./pages/LawyerRegister";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SearchPage from "./pages/SearchPage"; // ✅ Import this
import PrivateRoute from "./components/PrivateRoute";
import ClientRegister from "./pages/ClientRegister";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} /> {/* ✅ Add this */}
        <Route path="/register/lawyer" element={<LawyerRegister />} />
        <Route path="/register/client" element={<ClientRegister />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
