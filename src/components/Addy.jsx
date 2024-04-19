import React, { useState } from "react";
import Admin from "../pages/Admin";
import logo from "../assets/rentez-svg.svg";

const Addy = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_ADMIN_PASS);
    if (password === process.env.REACT_APP_ADMIN_PASS) {
      setAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword("");
  };

  return (
    <div>
      {authenticated ? (
        <div>
          <Admin />
          <button
            style={{ position: "absolute", top: "50px", right: "80px" }}
            onClick={handleLogout}
            className="profile-edit-button back-button"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-wrapper">
          <div className="auth-box">
            <form className="login" onSubmit={handleLogin} autoComplete="off">
              <img src={logo} alt="" />
              <h2 className="admin-login-heading">Admin Login</h2>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="special-btn">
                Login
              </button>
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addy;
