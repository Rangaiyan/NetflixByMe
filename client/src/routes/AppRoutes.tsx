import React, { ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import MyList from "../Components/HomePageComponents/MyList";
import WatchedList from "../Components/HomePageComponents/WatchedList";
import AdminDashboard from "../pages/admin/AdminDashboard";

import { getToken, getUserInfo } from "../utils/authUtils";

interface RouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const token = getToken();
  return token ? <Navigate to="/home" replace /> : <>{children}</>;
};

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const token = getToken();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminRoute: React.FC<RouteProps> = ({ children }) => {
  const user = getUserInfo();
  return user?.isAdmin ? <>{children}</> : <Navigate to="/home" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mylist"
        element={
          <ProtectedRoute>
            <MyList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchedlist"
        element={
          <ProtectedRoute>
            <WatchedList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard/>
          </AdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
