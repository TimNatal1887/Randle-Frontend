import { useEffect, useState } from "react";
import "../Styles/NavBar.css"

import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!toggleLogin) setUser(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  }, [toggleLogin]);

  return (
    <div className="navbar-container">
        <div className={`site-name ${toggleLogin ? "logged-in-title":"logged-out-title"}`}>
            <Link to="/" className="title-link">
                <h1>Randle</h1>
            </Link>
        </div>
        <div className="other-navlink-wraps">
          {toggleLogin && 
          <>
          <Link to="/dashboard" className="dashboard-head-link">
            <h5>Dashboard</h5>
          </Link>
          <Link to="/leaderboards" className="leaderboard-head-link">
              <h5>Leaderboards</h5>
          </Link>
          </>
          }
            <Link to="/about" className="about-head-link">
                <h5>About</h5>
            </Link>
            
        </div>
    </div>
);
}
export default NavBar;