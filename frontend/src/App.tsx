import "./index.css";
import HomeScreen from "./pages/Home/HeroSection.tsx";
import Landing from "./pages/LandingPage.tsx";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
