import React, { useState } from "react";

const AddDueModal = ({ isOpen, closeModal, addDue }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [dueType, setDueType] = useState("payable");

  const handleSubmit = () => {
    if (amount && description) {
      addDue({
        amount: parseFloat(amount),
        description,
        date: new Date().toISOString(),
        type: dueType,
      });
      closeModal();
    } else {
      alert("Please enter all fields.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Due</h3>
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded text-white"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded text-white"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Due Type</label>
            <select
              value={dueType}
              onChange={(e) => setDueType(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded text-white"
            >
              <option value="payable">Due Payable</option>
              <option value="receivable">Due Receivable</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={closeModal}
            className="text-red-500 hover:text-red-600"
          >
            Cancel
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

export default AddDueModal;
