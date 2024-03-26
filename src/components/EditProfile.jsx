import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDisplayPicture,
  updateProfile,
} from "../services/operations/SettingApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";

const EditProfile = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveloading, setSaveloading] = useState(false);

  const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other",
  ];

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    setLoading(true);
    fileInputRef.current.click();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreviewSource(file);
    }
  };

  const handleFileUpload = () => {
    try {
      console.log("uploading...");
      setSaveloading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setSaveloading(false);
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="edit-profile-wrapper">
      <h1>Edit Profile</h1>
      <div className="edit-profile-picture">
        <img src={previewSource || user?.image} alt="" />
        <div>
          <p>Change Profile Picture</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/svg, image/gif, image/jpeg"
          />
          {!loading ? (
            <button className="profile-edit-button" onClick={handleClick}>
              {" "}
              Change{" "}
            </button>
          ) : saveloading ? (
            <span className="loading"></span>
          ) : (
            <button className="profile-edit-button" onClick={handleFileUpload}>
              save
            </button>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(submitProfileForm)}
        className="edit-profile-detail"
      >
        <div className="edit-profile-details">
          <div className="edit-profile-details-column">
            <div className="edit-profile-details-column-data">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                {...register("firstName", { required: false })}
                defaultValue={user?.firstName}
              />
              {errors?.firstName && <span>Please enter your first name.</span>}
            </div>
            <div className="edit-profile-details-column-data">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                {...register("dateOfBirth", {
                  required: {
                    value: false,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors?.dateOfBirth && (
                <span>{errors?.dateOfBirth.message}</span>
              )}
            </div>
            <div className="edit-profile-details-column-data">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                {...register("contactNumber", {
                  required: {
                    value: false,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors?.contactNumber && (
                <span>{errors?.contactNumber.message}</span>
              )}
            </div>
          </div>
          <div className="edit-profile-details-column">
            <div className="edit-profile-details-column-data">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                {...register("lastName", { required: false })}
                defaultValue={user?.lastName}
              />
              {errors?.lastName && <span>Please enter your last name.</span>}
            </div>
            <div className="edit-profile-details-column-data">
              <label htmlFor="gender">Gender</label>
              <select
                type="text"
                name="gender"
                id="gender"
                {...register("gender", { required: false })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="edit-profile-details-column-data">
              <label htmlFor="about">About</label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                {...register("about", { required: false })}
                defaultValue={user?.additionalDetails?.about}
              />
            </div>
          </div>
        </div>

        <div className="edit-profile-detail-buttons">
          <button
            type="button"
            className="profile-edit-button back-button"
            onClick={() => navigate("/dashboard/settings")}
          >
            <FaArrowLeftLong />
            Back
          </button>
          <button type="submit" className="special-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
