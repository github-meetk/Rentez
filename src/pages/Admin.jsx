import React, { useEffect, useState } from "react";
import { getAllDetails } from "../services/operations/AdminAPI";
import icon1 from "../assets/icon-1.png";
import icon2 from "../assets/icon-2.png";
import icon3 from "../assets/icon-3.png";
import icon4 from "../assets/icon-4.png";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const Admin = () => {
  const [details, setDetails] = useState();
  ChartJS.register(ArcElement, Tooltip, Legend);

  const userSplitData = {
    labels: ['Customer', 'Seller'],
    datasets: [
      {
        data: [details?.customers, details?.sellers],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const sellerSubscriptionSplitData = {
    labels: ['purchased plan', 'not purchased plan'],
    datasets: [
      {
        data: [details?.sellers, details?.totalSubscription],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const propertiesSplitData = {
    labels: ['Flat', 'Bunglow', 'Villa', 'Farmhouse', 'Land'],
    datasets: [
      {
        data: [details?.flat, details?.bunglow, details?.villa, details?.farmhouse, details?.land],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

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
        <div className="admin-charts">
          <div className="charts"><Doughnut width={500} height={500} data={userSplitData} /></div>
          <div className="charts"><Doughnut width={500} height={500} data={sellerSubscriptionSplitData} /></div>
          <div className="charts"><Doughnut width={500} height={500} data={propertiesSplitData} /></div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
