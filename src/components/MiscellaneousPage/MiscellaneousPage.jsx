"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  onSnapshotMiscellaneousTransactions,
  addMiscellaneousTransaction,
} from "../../utils/firebaseUtils";
import AddMiscellaneousEntry from "./AddMiscellaneousEntry"; // Component for adding a new entry

const MiscellaneousPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [miscTransactions, setMiscTransactions] = useState([]);
  const [miscBalance, setMiscBalance] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const currency = useSelector((state) => state.currency.currency);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshotMiscellaneousTransactions(
        user.uid,
        (accountData) => {
          if (accountData) {
            setMiscBalance(accountData.balance || 0);
            setMiscTransactions(accountData.transactions || []);
          } else {
            setMiscBalance(0);
            setMiscTransactions([]);
          }
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  const handleAddTransaction = async (transaction) => {
    try {
      await addMiscellaneousTransaction(user.uid, transaction);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction. Please try again.");
    }
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
            {miscBalance.toFixed(2)}
          </p>
          <p className="text-gray-400">Miscellaneous Balance</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg"
        >
          Add Entry
        </button>
        <div className="text-center">
          <p className="text-3xl font-semibold">{miscTransactions.length}</p>
          <p className="text-gray-400">Total Miscellaneous Transactions</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-4">
        {miscTransactions.length ? (
          miscTransactions.map((txn, index) => (
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
        <AddMiscellaneousEntry
          closeModal={() => setShowModal(false)}
          onSave={handleAddTransaction}
        />
      )}
    </div>
  );
};

export default MiscellaneousPage;
