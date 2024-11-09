"use client";
import { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addTransaction,
  onSnapshotTransactions,
} from "../../utils/firebaseUtils";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Needs");

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const getCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const month = getCurrentMonth();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    const unsubscribeTransactions = onSnapshotTransactions(
      user.uid,
      month,
      (fetchedTransactions) => {
        setTransactions(
          Array.isArray(fetchedTransactions) ? fetchedTransactions : []
        );
      }
    );

    return () => {
      unsubscribeTransactions();
    };
  }, [user, isLoggedIn, month]);

  const handleAddTransaction = async () => {
    const transaction = {
      date: date || new Date().toISOString().split("T")[0],
      amount: parseFloat(amount),
      category,
      description,
    };

    try {
      await addTransaction(user.uid, month, transaction);
      setShowModal(false);
      alert("Transaction added successfully!");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="p-2 overflow-y h-full text-white">
      <div className="p-2 overflow-y-auto scrollbar-none h-full text-white">
        <div
          className="rounded-lg p-6 shadow-md mt-6"
          style={{
            backgroundColor: "var(--gray-900)",
            borderRadius: "10px",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Transactions</h2>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 rounded hover:bg-green-600"
                style={{
                  backgroundColor: "var(--gray-700)",
                  color: "var(--text-color)",
                }}
                onClick={() => setShowModal(true)}
              >
                Add Entry
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table
              className="min-w-full"
              style={{
                backgroundColor: "var(--gray-800)",
                color: "var(--text-color)",
                borderRadius: "10px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "var(--gray-700)",
                    borderRadius: "20px",
                  }}
                >
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction, ind) => (
                    <tr
                      key={ind}
                      style={{
                        backgroundColor: "var(--gray-800)",
                        marginBottom: "8px",
                        borderRadius: "10px",
                        borderBottom: "1px solid var(--gray-600)",
                      }}
                      className="shadow-md"
                    >
                      <td className="py-3 px-4">{transaction.date}</td>
                      <td className="py-3 px-4">{transaction.description}</td>
                      <td className="py-3 px-4">{transaction.category}</td>
                      <td className="py-3 px-4">{transaction.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No transactions available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
