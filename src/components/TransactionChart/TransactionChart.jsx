import React from "react";
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

// Register required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionChart = ({ transactions }) => {
  // Group transactions by category and calculate the total amount spent per category
  const categories = ["Needs", "Wants", "Investments"];
  const categoryData = categories.map((category) => {
    const total = transactions
      .filter((txn) => txn.category === category)
      .reduce((sum, txn) => sum + txn.amount, 0);
    return total;
  });

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Spending by Category",
        data: categoryData,
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"], // Different colors for each category
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff", // Label color
        },
      },
      title: {
        display: true,
        text: "Transaction Spending by Category",
        color: "#fff", // Title color
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff", // X-axis labels color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // X-axis grid lines
        },
      },
      y: {
        ticks: {
          color: "#fff", // Y-axis labels color
          beginAtZero: true,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Y-axis grid lines
        },
      },
    },
  };

  return (
    <div
      style={{ backgroundColor: "#333", padding: "20px", borderRadius: "10px" }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default TransactionChart;
