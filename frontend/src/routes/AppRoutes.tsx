import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Landing from "../pages/LandingPage";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default AppRoutes;
