"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { onSnapshotAccountTransactions } from "../../utils/firebaseUtils"; // Make sure this utility listens to investmentsAccount
import AddInvestmentEntry from "./AddInvestmentEntry";

const InvestmentPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [investmentTransactions, setInvestmentTransactions] = useState([]);
  const [investmentBalance, setInvestmentBalance] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const currency = useSelector((state) => state.currency.currency);

  // Fetch investment transactions in real-time
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshotAccountTransactions(
        user.uid,
        "investmentsAccount",
        (transactions) => {
          setInvestmentTransactions(transactions);
          calculateTotals(transactions);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  // Calculate balance and total amount invested
  const calculateTotals = (transactions) => {
    const totalBalance = transactions.reduce((acc, txn) => acc + txn.amount, 0);
    setInvestmentBalance(totalBalance);
  };

  return (
    <div
      className="p-6 text-white"
      style={{ backgroundColor: "var(--gray-900)" }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <p className="text-3xl font-semibold">
            {currency}
            {investmentBalance.toFixed(2)}
          </p>
          <p className="text-gray-400">Investments Balance</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg"
        >
          Add Entry
        </button>
        <div className="text-center">
          <p className="text-3xl font-semibold">
            {investmentTransactions.length}
          </p>
          <p className="text-gray-400">Total Investments</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-4">
        {investmentTransactions.length ? (
          investmentTransactions.map((txn, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border-b border-gray-700"
            >
              <span className="text-lg">{txn.date}</span>
              <span>{txn.description}</span>
              <span className="text-green-500">
                {currency}
                {txn.amount.toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            Your transactions will appear here.
          </p>
        )}
      </div>
      {showModal && (
        <AddInvestmentEntry
          closeModal={() => setShowModal(false)}
          userId={user.uid} // Pass the userId to AddInvestmentEntry for adding transactions
        />
      )}
    </div>
  );
};

export default InvestmentPage;
