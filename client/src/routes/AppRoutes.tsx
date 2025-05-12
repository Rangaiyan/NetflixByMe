import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Landing from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import MyList from "../Components/HomePageComponents/MyList";
import WatchedList from "../Components/HomePageComponents/WatchedList";
import AdminDashboard from "../pages/admin/AdminDashboard";

import { getToken, getUserInfo } from "../utils/authUtils";


const PublicRoute = () => {
  const token = getToken();
  return token ? <Navigate to="/home" replace /> : <Outlet />;
};


const ProtectedRoute = () => {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
  const user = getUserInfo();
  return user?.isAdmin ? <Outlet /> : <Navigate to="/home" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>

      <Route element={<PublicRoute />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/watchedlist" element={<WatchedList />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
