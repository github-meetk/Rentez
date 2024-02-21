import React, { useEffect, useState } from "react";
import { getAllDetails } from "../services/operations/AdminAPI";
import icon1 from "../assets/icon-1.png";
import icon2 from "../assets/icon-2.png";
import icon3 from "../assets/icon-3.png";
import icon4 from "../assets/icon-4.png";
import Chart from 'chart.js/auto';


const Admin = () => {
  const [details, setDetails] = useState();

  useEffect(() => {
    const api = async () => {
      const response = await getAllDetails();
      console.log(response.data.data);
      setDetails(response.data.data);
    };

    api();
  }, []);

  const calTrendingPlan = () => {
    const standard = details?.Standard;
    const gold = details?.Gold;
    const premium = details?.Premium;

    if (standard > gold) {
      if (standard > premium) {
        return "Standard";
      } else {
        return "Premium";
      }
    } else {
      if (gold > premium) {
        return "Gold";
      } else {
        return "Premium";
      }
    }
  };

  const trendingPlan = calTrendingPlan();

  return (
    <div className="admin-wrapper">
      <div className="admin">
        <h1>Dashboard</h1>
        <div className="admin-main-display">
          <div className="admin-box">
            <div className="admin-box-left">
              <img src={icon1} alt="group" />
            </div>
            <div className="admin-box-right">
              {details?.users}
              <p>total users</p>
            </div>
          </div>
          <div className="admin-box">
            <div className="admin-box-left">
              <img src={icon2} alt="group" />
            </div>

            <div className="admin-box-right">
              {details?.amount} ₹<p>total revenue</p>
            </div>
          </div>
          <div className="admin-box">
            <div className="admin-box-left">
              <img src={icon3} alt="group" />
            </div>

            <div className="admin-box-right">
              {details?.properties}
              <p>total properties</p>
            </div>
          </div>
          <div className="admin-box">
            <div className="admin-box-left">
              <img src={icon4} alt="group" />
            </div>

            <div className="admin-box-right">
              {trendingPlan}
              <p>trending plan</p>
            </div>
          </div>
        </div>
        <div className="admin-other-display">
          <div className="admin-box">
            <div className="admin-box-left">
              <img src={icon1} alt="group" />
            </div>
            <div className="admin-box-right">
              {details?.flat}
              <p>no. of flat</p>
            </div>
          </div>
          <div className="admin-box">
            <div className="admin-box-left">
              <img src={icon1} alt="group" />
            </div>
            <div className="admin-box-right">
              {details?.bunglow}
              <p>no. of bunglow</p>
            </div>
          </div>
          <div className="admin-box">
            <div className="admin-box-left">
              <img src={icon1} alt="group" />
            </div>
            <div className="admin-box-right">
              {details?.villa}
              <p>no. of villa</p>
            </div>
          </div>
          <div className="admin-box">
            <div className="admin-box-left">
              <img src={icon1} alt="group" />
            </div>
            <div className="admin-box-right">
              {details?.farmhouse}
              <p>no. of farmhouse</p>
            </div>
          </div>
          <div className="admin-box">
            <div className="admin-box-left">
              <img src={icon1} alt="group" />
            </div>
            <div className="admin-box-right">
              {details?.land}
              <p>no. of land</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
