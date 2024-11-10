import React, { useState } from "react";
import { addTransactionToAccount } from "../../utils/firebaseUtils";

const AddInvestmentEntry = ({ closeModal, userId }) => {
  const [investmentName, setInvestmentName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddTransaction = async () => {
    if (!investmentName || !amount) return alert("All fields are required!");

    const newTransaction = {
      date: date || new Date().toISOString().split("T")[0],
      description: investmentName,
      amount: parseFloat(amount),
    };

    try {
      await addTransactionToAccount(
        userId,
        "investmentsAccount",
        newTransaction
      );
      closeModal(); // Close modal after adding transaction
      alert("Investment added successfully!");
    } catch (error) {
      console.error("Failed to add investment:", error);
      alert("Error adding investment. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Investment Entry</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-200"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Investment Name</label>
            <input
              type="text"
              placeholder="E.g., Reliance Industries"
              value={investmentName}
              onChange={(e) => setInvestmentName(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Date (optional)</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input
              type="number"
              placeholder="E.g., 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={closeModal}
            className="text-red-500 hover:text-red-600"
          >
            Close
          </button>
          <button
            onClick={handleAddTransaction}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInvestmentEntry;
