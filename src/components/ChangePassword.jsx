import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { changePassword } from "../services/operations/SettingApi";
import { FaArrowLeftLong } from "react-icons/fa6";

const ChangePassword = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = async (data) => {
    // console.log("password Data - ", data)
    try {
      await changePassword(token, data);
      // window.location.reload();
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  return (
    <div className="change-password-wrapper">
      <div className="change-password-heading">
        <h1>Change Password</h1>
        <p>
          Change your account password from here. Make sure to setup a strong
          password.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitPasswordForm)}
        className="change-password"
      >
        <div className="change-password-data">
          <label htmlFor="oldPassword">Current Password</label>
          <div>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter Current Password"
              {...register("oldPassword", { required: true })}
            />
            <span onClick={() => setShowOldPassword((prev) => !prev)}>
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
          {errors.oldPassword && <p>Please enter your Current Password.</p>}
        </div>

        <div className="change-password-data">
          <label htmlFor="newPassword">New Password</label>
          <div>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Password"
              {...register("newPassword", { required: true })}
            />
            <span onClick={() => setShowNewPassword((prev) => !prev)}>
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
          {errors.newPassword && <p>Please enter your New Password.</p>}
        </div>
        <div className="change-password-buttons">
          <button type="button" className="profile-edit-button back-button" onClick={() => navigate("/dashboard/settings")}> <FaArrowLeftLong />Back</button>
          <button className="profile-edit-button" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
