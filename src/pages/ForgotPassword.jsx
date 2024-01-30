import React, { useState } from "react";
import logo from "../assets/rentez-svg.svg";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import image1 from "../assets/objcet_1.png";
import image2 from "../assets/object_2.png";
import image3 from "../assets/object_3.png";
import image4 from "../assets/object_4.png";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [email, setemail] = useState("");
  const [emailSent, setemailSent] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setemailSent));
  };
  return (
    <div className="auth-wrapper">
      <img className="imge1" src={image1} alt="" />
      <img className="imge2" src={image2} alt="" />
      <img className="imge3" src={image3} alt="" />
      <img className="imge4" src={image4} alt="" />
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="forgot-password-box">
            <form onSubmit={handleOnSubmit}>
          <img src={logo} alt=""></img>
          <h2>{!emailSent ? "Reset Passeord" : "Check Email"}</h2>
          <p>
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset password link to ${email}`}
          </p>
          {!emailSent && (
            <input
              required=""
              type="email"
              name="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          )}
          <button className="special-btn" type="submit">{!emailSent ? "Submit" : "Resend"}</button>
          <Link className="forgot-password-link" to={"/login"}>Back to Login</Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
