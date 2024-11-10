import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TransactionChart = ({ transactions }) => {
  // Group transactions by date and category, then calculate total per day for each category
  const categories = ["Needs", "Wants", "Investments"];

  // Get unique dates and sort them
  const dates = [...new Set(transactions.map((txn) => txn.date))].sort();

  // Calculate the total spending per category per day
  const categoryData = categories.map((category) =>
    dates.map((date) => {
      const dailyTotal = transactions
        .filter((txn) => txn.category === category && txn.date === date)
        .reduce((sum, txn) => sum + txn.amount, 0);
      return dailyTotal;
    })
  );

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Needs",
        data: categoryData[0],
        borderColor: "#4CAF50", // Green for Needs
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Wants",
        data: categoryData[1],
        borderColor: "#FFC107", // Yellow for Wants
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Investments",
        data: categoryData[2],
        borderColor: "#F44336", // Red for Investments
        backgroundColor: "rgba(244, 67, 54, 0.2)",
        tension: 0.3,
        fill: true,
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
        text: "Transaction Spending by Category Over Time",
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
      style={{
        backgroundColor: "var(--gray-900)",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default TransactionChart;
