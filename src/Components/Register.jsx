import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Register.css"
import BadWordsNext from 'bad-words-next';
import en from 'bad-words-next/data/en.json'

const badwords = new BadWordsNext({ data: en })

const URL = import.meta.env.VITE_BASE_URL;

const Register = ({ setToggleLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", email: "", total_score:0});
  const [error, setError] = useState(false)
  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const badUserNameCheck = badwords.check(user.username)
    const badEmailCheck = badwords.check(user.email)

    if(!badUserNameCheck && !badEmailCheck){
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify(user),
      };
  
      try {
        const res = await fetch(`${URL}/api/auth/register`, options);
  
        if (!res.ok) throw new Error("Registration failed");
        const data = await res.json();
  
        if (data.token) {
          // in case there is an old token in the browser, remove it
          localStorage.removeItem("token");
          // set the new user's JWT token in the browser
          localStorage.setItem("token", data.token);
          setToggleLogin(true);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }else{
      setError(true)
    }

  }

  // USE THIS FORM TO BUILD OUT YOUR FORM PROPERLY BY ADDING LABELS AND INPUTS AS WELL AS WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE CODE

  return (
    <div style={{ textAlign: "center" }} className="register-container">
      <div className="register-form-wrap">
      <p className="register-login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <h3 className="register-header">Register</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="username">
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="username"
            onChange={(e) => handleChange(e, user, setUser)}
            autoComplete="username"
            className="username-input"
          />
        </label>

        <label htmlFor="email">
          <input
            id="email"
            value={user.email}
            type="email"
            placeholder="email"
            onChange={(e) => handleChange(e, user, setUser)}
            autoComplete="email"
            className="email-input"
          />
        </label>

        <label htmlFor="password">
          <input
            id="password"
            value={user.password}
            type="password"
            placeholder="password"
            onChange={(e) => handleChange(e, user, setUser)}
            autoComplete="current-password"
            className="password-input"
          />
        </label>

        <button className="register-button">Submit</button>
        {error && <p className="error"> Please enter a different username/password!</p>}
      </form>
      </div>
    </div>
  );
};

export default Register;