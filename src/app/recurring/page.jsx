"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addRecurringExpense,
  fetchRecurringExpenses,
} from "../../utils/firebaseUtils";

const RecurringExpenses = () => {
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    frequency: "Monthly",
    startDate: "",
    category: "Needs",
  });
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const loadRecurringExpenses = async () => {
      if (user) {
        try {
          const data = await fetchRecurringExpenses(user.uid);
          setRecurringExpenses(data);
        } catch (error) {
          console.error("Error fetching recurring expenses:", error);
        }
      }
    };

    loadRecurringExpenses();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addRecurringExpense(user.uid, {
        ...formData,
        amount: parseFloat(formData.amount),
      });

      // Refresh the recurring expenses list
      const updatedExpenses = await fetchRecurringExpenses(user.uid);
      setRecurringExpenses(updatedExpenses);
      setFormData({
        name: "",
        amount: "",
        frequency: "Monthly",
        startDate: "",
        category: "Needs",
      });
    } catch (error) {
      console.error("Error adding recurring expense:", error);
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
      <h1 className="text-2xl font-semibold mb-6">Recurring Expenses</h1>

      <form onSubmit={handleAddExpense} className="mb-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-400">Expense Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400">Frequency</label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-800 text-white"
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-800 text-white"
          >
            <option value="Needs">Needs</option>
            <option value="Wants">Wants</option>
            <option value="Investments">Investments</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
        >
          Add Recurring Expense
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">
        Existing Recurring Expenses
      </h2>
      {recurringExpenses.length > 0 ? (
        <ul className="space-y-4">
          {recurringExpenses.map((expense, index) => (
            <li
              key={index}
              className="p-4 rounded-lg bg-gray-800 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{expense.name}</h3>
                <p className="text-gray-400 text-sm">{expense.frequency}</p>
                <p className="text-gray-400 text-sm">
                  {expense.category} | Start: {expense.startDate}
                </p>
              </div>
              <p className="font-semibold">{expense.amount.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No recurring expenses found.</p>
      )}
    </div>
  );
};

export default RecurringExpenses;
