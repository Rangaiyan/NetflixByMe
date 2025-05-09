import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import Landing from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import MyList from "../Components/HomePageComponents/MyList";
import WatchedList from "../Components/HomePageComponents/WatchedList";

const useToken = () => localStorage.getItem("accessToken");

const ProtectedRoute = () => {
  const token = useToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const PublicRoute = () => {
  const token = useToken();
  if (token) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};

const AppRoutes = () => {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(!!useToken());

  useEffect(() => {
    const token = useToken();
    setIsAuth(!!token);
  }, [location]);

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
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
