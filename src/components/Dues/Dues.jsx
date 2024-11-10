"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchDuesData, addDueTransaction } from "../../utils/firebaseUtils";
import AddDueModal from "./AddDueModal";

const DuesPage = () => {
  const [view, setView] = useState("payable"); // "payable" or "receivable"
  const [duesData, setDuesData] = useState({ balance: 0, transactions: [] });
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const currency = useSelector((state) => state.currency.currency);

  useEffect(() => {
    const loadDuesData = async () => {
      if (user) {
        try {
          const data = await fetchDuesData(user.uid, view);
          setDuesData(data || { balance: 0, transactions: [] });
        } catch (error) {
          console.error("Error fetching dues data:", error);
        }
      }
    };

    loadDuesData();
  }, [user, view]);

  const handleAddDue = async (due) => {
    if (user) {
      try {
        await addDueTransaction(user.uid, due.type, {
          amount: due.amount,
          description: due.description,
          date: due.date,
        });
        const updatedData = await fetchDuesData(user.uid, view);
        setDuesData(updatedData || { balance: 0, transactions: [] });
      } catch (error) {
        console.error("Error adding due transaction:", error);
      }
    }
  };

  return (
    <div
      className="p-6 text-white rounded-lg"
      style={{
        backgroundColor: "var(--gray-900)",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <p className="text-4xl font-semibold">
            {currency}
            {duesData.balance.toFixed(2)}
          </p>
          <p className="text-gray-400">
            {view === "payable" ? "Due Payable" : "Due Receivable"}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setView("payable")}
            className={`px-4 py-2 rounded-lg ${
              view === "payable"
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Due Payable
          </button>
          <button
            onClick={() => setView("receivable")}
            className={`px-4 py-2 rounded-lg ${
              view === "receivable"
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Due Receivable
          </button>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg"
        >
          Add Due
        </button>
      </div>

      <div className="border-t border-gray-700 mt-4">
        {duesData.transactions.length ? (
          duesData.transactions.map((txn, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border-b border-gray-700"
            >
              <span className="text-lg">
                {new Date(txn.date).toLocaleDateString()}
              </span>
              <span>{txn.description}</span>
              <span className="text-green-500">
                {currency}
                {txn.amount.toFixed(2)}
              </span>
              {/* <span
                className={`text-sm ${
                  txn.status === "paid" || txn.status === "received"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {txn.status}
              </span> */}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            Your dues will appear here.
          </p>
        )}
      </div>

      {/* Add Due Modal */}
      <AddDueModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        addDue={handleAddDue}
      />
    </div>
  );
};

export default DuesPage;
