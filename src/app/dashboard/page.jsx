"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addTransaction, fetchTransactions } from "../../utils/firebaseUtils";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Needs");

  const state = useSelector((state) => state.auth);
  const month = state.user.month;

  useEffect(() => {
    // Monitor auth state and set the user
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const loadTransactions = async () => {
      if (!user || !month) return; // Ensure user and month are set

      try {
        const fetchedTransactions = await fetchTransactions(user.uid, month);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Error loading transactions:", error);
      }
    };

    loadTransactions();
  }, [user, month]); // Re-run when user or month changes

  const handleAddTransaction = async () => {
    const transaction = {
      date: date || new Date().toISOString().split("T")[0],
      amount: parseFloat(amount),
      category,
      description,
    };

    try {
      await addTransaction(user.uid, month, transaction);
      alert("Transaction added successfully!");
    } catch (error) {
      alert("Failed to add transaction. Please try again.");
    }
  };

  return (
    <div className="p-2 overflow-y-auto scrollbar-none h-full bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-lg p-6 shadow-md mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <div className="flex space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setShowModal(true)}
            >
              Add Entry
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg shadow-sm text-white">
            <thead>
              <tr className="text-left bg-gray-700">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, ind) => (
                <tr key={ind} className="border-b border-gray-600">
                  <td className="py-3 px-4">{transaction.date}</td>
                  <td className="py-3 px-4">{transaction.description}</td>
                  <td className="py-3 px-4">{transaction.category}</td>
                  <td className="py-3 px-4">{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Expense</h3>
              <button
                onClick={() => setShowModal(false)}
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
                  placeholder="E.g.: 20"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Expense Description
                </label>
                <input
                  type="text"
                  placeholder="E.g.: Coffee"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
              <div className="flex space-x-4 mt-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value="Needs"
                    checked={category === "Needs"}
                    onChange={() => setCategory("Needs")}
                    className="text-green-500"
                  />
                  <span className="ml-2">Needs</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value="Wants"
                    checked={category === "Wants"}
                    onChange={() => setCategory("Wants")}
                    className="text-green-500"
                  />
                  <span className="ml-2">Wants</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowModal(false)}
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
      )}
    </div>
  );
}
