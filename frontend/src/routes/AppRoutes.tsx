import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Authentication/Login";
import Landing from "../pages/LandingPage";
import Register from "../Authentication/Register";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
