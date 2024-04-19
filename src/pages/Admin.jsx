import React, { useEffect, useState } from "react";
import { getAllDetails } from "../services/operations/AdminAPI";
import icon1 from "../assets/icon-1.png";
import icon2 from "../assets/icon-2.png";
import icon3 from "../assets/icon-3.png";
import icon4 from "../assets/icon-4.png";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const Admin = () => {
  const [details, setDetails] = useState();
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [loading, setLoading] = useState(true);

  const userSplitData = {
    labels: ["Customer", "Seller"],
    datasets: [
      {
        data: [details?.customers, details?.sellers],
        backgroundColor: ["#8481DD", "#3C3D99"],
        borderColor: ["white"],
        borderWidth: 5,
      },
    ],
  };

  const sellerSubscriptionSplitData = {
    labels: ["purchased plan", "not purchased plan"],
    datasets: [
      {
        data: [
          details?.totalSubscription,
          details?.sellers - details?.totalSubscription,
        ],
        backgroundColor: ["#3C3D99", "#B2B0EA"],
        borderColor: ["white"],
        borderWidth: 5,
      },
    ],
  };
  const propertiesSplitData = {
    labels: ["Flat", "Bunglow", "Villa", "Farmhouse", "Land"],
    datasets: [
      {
        data: [
          details?.flat,
          details?.bunglow,
          details?.villa,
          details?.farmhouse,
          details?.land,
        ],
        backgroundColor: [
          "#2A265F",
          "#3C3D99",
          "#5752D1",
          "#8481DD",
          "#B2B0EA",
        ],
        borderColor: ["white"],
        borderWidth: 5,
      },
    ],
  };

  useEffect(() => {
    const api = async () => {
      setLoading(true);
      const response = await getAllDetails();
      setDetails(response.data.data);
      setLoading(false);
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
      {loading ? (
        <div className="spinner-loader-wrapper">
          <div className="spinner" />
        </div>
      ) : (
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
          <div className="admin-charts">
            <div className="charts">
              <Doughnut width={500} height={500} data={userSplitData} />
            </div>
            <div className="charts">
              <Doughnut
                width={500}
                height={500}
                data={sellerSubscriptionSplitData}
              />
            </div>
            <div className="charts">
              <Doughnut width={500} height={500} data={propertiesSplitData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
