import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/rentez-svg.svg";
import { login } from "../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import image1 from "../assets/objcet_1.png";
import image2 from "../assets/object_2.png";
import image3 from "../assets/object_3.png";
import image4 from "../assets/object_4.png";

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
    <div className="auth-wrapper">
      <img className="imge1" src={image1} alt="" />
      <img className="imge2" src={image2} alt="" />
      <img className="imge3" src={image3} alt="" />
      <img className="imge4" src={image4} alt="" />
      <div className="auth-box">
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
          <div className="login-pass">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Password"
            />
            <span
              className="eye-login"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
          <div className="login-button">
            <button className="special-btn" type="submit">
              Log in
            </button>
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
