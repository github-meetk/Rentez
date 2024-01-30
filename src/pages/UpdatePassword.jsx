import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import logo from "../assets/rentez-svg.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {resetPassword} from "../services/operations/authAPI";
import image1 from "../assets/objcet_1.png";
import image2 from "../assets/object_2.png";
import image3 from "../assets/object_3.png";
import image4 from "../assets/object_4.png";

const UpdatePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { loading } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
      password: "",
      confirmPassword: "",
    })
  
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
    const { password, confirmPassword } = formData
  
    const handleOnChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }
  
    const handleOnSubmit = (e) => {
      e.preventDefault()
      const token = location.pathname.split("/").at(-1)
      dispatch(resetPassword(password, confirmPassword, token, navigate))
    }
  

  return (
    <div className="auth-wrapper">
      <img className="imge1" src={image1} alt="" />
      <img className="imge2" src={image2} alt="" />
      <img className="imge3" src={image3} alt="" />
      <img className="imge4" src={image4} alt="" />
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="update-password-box">
          <img src={logo} alt=""></img>
          <h2>Create New Password</h2>
          <form onSubmit={handleOnSubmit} autoComplete="off">
            <div>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter New Password"
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            <div>
            <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm New Password"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            <button className="special-btn" type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
