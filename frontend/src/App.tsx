import "./index.css";
import HomeScreen from "./pages/Home/HomeScreen.tsx" 
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
    </Routes>
     
    </>
  );
}

export default App;
