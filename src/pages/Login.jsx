import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/rentez-svg.svg";
import { login } from "../services/operations/authAPI";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
    navigate("/");
  };
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <form onSubmit={handleOnSubmit} className="login" autoComplete="off">
          <img src={logo} alt="" />
          <h2>Log in</h2>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Email"
          />
          <div>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Password"
            />
          </div>
          <div className="login-button">
            <button type="submit">Log in</button>
            <Link className="login-button-link" to={"/signup"}>
              No account?Sign up
            </Link>
            <Link className="login-button-link" to={"/forgot-password"}>
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
