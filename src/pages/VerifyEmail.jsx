import React, { useEffect, useState } from "react";
import logo from "../assets/rentez-svg.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp, sendOtp } from "../services/operations/authAPI";
import OTPInput from "react-otp-input";
import image1 from "../assets/objcet_1.png";
import image2 from "../assets/object_2.png";
import image3 from "../assets/object_3.png";
import image4 from "../assets/object_4.png";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate,
      )
    );
  };

  return (
    <div className="auth-wrapper">
      <img className="imge1" src={image1} alt="" />
      <img className="imge2" src={image2} alt="" />
      <img className="imge3" src={image3} alt="" />
      <img className="imge4" src={image4} alt="" />
      {
        loading ? (
          <span className="loader"></span>
        ) : (
          <div className="verify-email-box">
        <img src={logo} alt=""></img>
        <h1>Verify Email</h1>
        <p style={{textAlign:"center"}}>A verification code has been sent to your mail. Enter the code below</p>
        <form onSubmit={handleVerifyAndSignup}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder=""
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="otp-input"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 10px",
            }}
          />
          <div className="verify-email-button">
            <button className="special-btn" type="submit">Submit</button>
            <button type="button" className="resend-btn" onClick={() => dispatch(sendOtp(signupData.email))}> Resend it</button>
          </div>
          
        </form>
      </div>
        )
      }
      
    </div>
  );
};

export default VerifyEmail;
