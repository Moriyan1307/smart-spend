"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { onSnapshotBudget } from "../../utils/firebaseUtils"; // Ensure correct import path
import { useSelector } from "react-redux";

// Register required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const [budgetData, setBudgetData] = useState({
    needs: 0,
    wants: 0,
    investments: 0,
  });

  const user = useSelector((state) => state.auth.user);
  const month = useSelector((state) => state.auth.user.month);
  const userId = user.uid;

  useEffect(() => {
    if (!userId || !month) return;

    const unsubscribe = onSnapshotBudget(userId, month, (data) => {
      setBudgetData(data);
    });

    return () => unsubscribe();
  }, [userId, month]);

  const data = {
    labels: ["Needs", "Wants", "Investments"],
    datasets: [
      {
        label: "Budget Allocation",
        data: [budgetData.needs, budgetData.wants, budgetData.investments],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"], // Colors for each category
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Current Budget Allocation",
        color: "#fff",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "#fff",
          beginAtZero: true,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "var(--gray-900)",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default Overview;
