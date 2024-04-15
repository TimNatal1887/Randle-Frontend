import { Link } from "react-router-dom";
import "../Styles/Landing.css"

const imageURL = "/assets/basketball.png"

function LandingPage() {
  return (
    <div className="landing-wrap">
      <h1 className="site-header">Randle</h1>
      <h2 className="site-header-two">An NBA Guessing Game</h2>
      <div className="img-container">
        <img src={imageURL} className="basketball-img"/>
        <div className="dashboard-link">
        <Link to="/dashboard">
          <p className="play-button">Play Game</p>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default LandingPage;
