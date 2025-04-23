import "./index.css";
import Landing from "./pages/LandingPage.tsx";
import { Navigate, Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.tsx";

function App() {
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
