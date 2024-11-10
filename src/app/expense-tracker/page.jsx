"use client";

import React, { useEffect, useState } from "react";
import AccountOverview from "../../components/AccountOverview/AccountOverview";
import Dashboard from "../../components/Dashboard/Dashboard";
import ExpenseInsights from "../../components/Insight/ExpenseInsights";
import TransactionChart from "../../components/TransactionChart/TransactionChart";
import { useSelector } from "react-redux";
import { onSnapshotTransactions } from "../../utils/firebaseUtils";

const sampleTransactions = [
  {
    date: "2024-11-01",
    category: "Needs",
    amount: 200,
    description: "Groceries",
  },
  {
    date: "2024-11-02",
    category: "Wants",
    amount: 150,
    description: "Dining Out",
  },
  {
    date: "2024-11-03",
    category: "Investments",
    amount: 100,
    description: "Stocks",
  },
];

const ProfilePage = () => {
  // State to control the view toggle
  const [view, setView] = useState("insights");

  const [transactions, setTransactions] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const month = useSelector((state) => state.auth.user.month);

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    // Call the `onSnapshotTransactions` function with the user ID, month, and a callback
    const unsubscribe = onSnapshotTransactions(
      user.uid,
      month,
      setTransactions
    );

    // Cleanup function to unsubscribe from real-time updates when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [user, isLoggedIn, month]);

  return (
    <div className="flex flex-col w-full">
      {/* Full-width Toggle Section */}
      <div className="flex justify-center w-full py-4   rounded-lg">
        <button
          onClick={() => setView("insights")}
          className={`px-6 py-3 font-semibold w-5/12 rounded-l-lg transition-colors ${
            view === "insights"
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          style={{
            backgroundColor:
              view === "insights" ? "var(--gray-700)" : "var(--gray-800)",
            color:
              view === "insights" ? "var(--text-color)" : "var(--gray-200)",
          }}
        >
          Insights
        </button>
        <button
          onClick={() => setView("graph")}
          className={`px-6 py-3 font-semibold rounded-r-lg w-5/12 transition-colors ${
            view === "graph"
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          style={{
            backgroundColor:
              view === "graph" ? "var(--gray-700)" : "var(--gray-800)",
            color: view === "graph" ? "var(--text-color)" : "var(--gray-200)",
          }}
        >
          Graph
        </button>
      </div>

      {view === "insights" ? (
        <div className="flex space-x-4 p-4 ">
          <div className="w-2/3">
            <Dashboard />
          </div>

          <div className="w-1/3 ">
            <ExpenseInsights />
          </div>
        </div>
      ) : (
        <TransactionChart transactions={transactions} />
      )}
    </div>
  );
};

export default ProfilePage;
