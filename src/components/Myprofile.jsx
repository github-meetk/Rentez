import React from "react";
import { FiPhone } from "react-icons/fi";
import { useSelector } from "react-redux";
import { LuMail } from "react-icons/lu";

const Myprofile = () => {
  const { user } = useSelector((state) => state.profile);

  const isSubscribed = new Date (user.subscriptionExpires).getTime() > new Date(Date.now()).getTime();

  return (
    <div className="my-profile-wrapper">
      <h1>My profile</h1>
      <div className="my-profile-details">
        <div className="my-profile-main">
          {
            isSubscribed ? (<div className="subscribed">Subscribed</div>) : (<div className="not-subscribed">Not Subscribed</div>)
          }
          <img src={user.image} alt="" />
          <div className="my-profile-main-details">
            <h2>{user?.accountType}</h2>
            <h3>
              {user?.firstName} {user?.lastName}
            </h3>
            {user.additionalDetails.contactNumber && (
              <div>
              <FiPhone />
              {user?.additionalDetails?.contactNumber}
            </div>
            )}
            
            <div>
              <LuMail />
              {user?.email}
            </div>
            <p>{user?.additionalDetails?.about}</p>
          </div>
        </div>
        <div className="my-profile-additional-details">
            <h2>Personal Details</h2>
          <div className="my-profile-additional-details-table">
            <div className="my-profile-additional-details-left">
              <div>First Name</div>
              <p>{user?.firstName}</p>
              <div>Email</div>
              <p>{user?.email}</p>
              <div>Gender</div>
              <p>{user?.additionalDetails?.gender ? (user?.additionalDetails?.gender) : ("-")}</p>
            </div>
            <div className="my-profile-additional-details-left">
              <div>Last Name</div>
              <p>{user?.lastName}</p>
              <div>Phone Number</div>
              <p>{user?.additionalDetails?.contactNumber ? (user?.additionalDetails?.contactNumber) : ("-")}</p>
              <div>Date of Birth</div>
              <p>{user?.additionalDetails?.dateOfBirth ? (user?.additionalDetails?.dateOfBirth) : ("-")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
