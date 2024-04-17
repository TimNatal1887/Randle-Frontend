import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";
import Leaderboard from "./Components/Leaderboard";
import About from "./Components/About";
import "./App.css"

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  return (
    <div className="page-wrap">
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />
      <div className="page-body-wrap">
      <Routes>
        <Route
          path="/login"
          element={<Login setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} setToggleLogin={setToggleLogin} />}
          />
          <Route path="/leaderboards" element={<Leaderboard/>}/>
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
