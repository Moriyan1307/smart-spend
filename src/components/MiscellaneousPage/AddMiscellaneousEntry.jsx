import React, { useState } from "react";

const AddMiscellaneousEntry = ({ closeModal, onSave }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date

  const handleSubmit = () => {
    if (!amount || !description) {
      alert("Please provide both amount and description.");
      return;
    }

    const transaction = {
      date,
      amount: parseFloat(amount),
      description,
    };

    onSave(transaction);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Miscellaneous Expense</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-200"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white"
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
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMiscellaneousEntry;
