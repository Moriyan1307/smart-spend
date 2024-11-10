"use client";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  onSnapshotTransactions,
} from "../../utils/firebaseUtils"; // Make sure updateTransaction and deleteTransaction are defined here
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
  const [transactionId, setTransactionId] = useState(""); // Store the ID of the transaction being edited
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Needs");

  const router = usePathname();

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

  const handleAddOrUpdateTransaction = async () => {
    const transaction = {
      date: date || new Date().toISOString().split("T")[0],
      amount: parseFloat(amount),
      category,
      description,
    };

    try {
      if (isEditing) {
        // Update existing transaction
        await updateTransaction(user.uid, month, transactionId, transaction);
        alert("Transaction updated successfully!");
      } else {
        // Add new transaction
        await addTransaction(user.uid, month, transaction);
        alert("Transaction added successfully!");
      }

      setShowModal(false);
      setIsEditing(false); // Reset editing state
      clearForm();
    } catch (error) {
      alert(error);
    }
  };

  const handleEdit = (transaction, id) => {
    // Set form values with transaction details for editing
    setTransactionId(id);
    setAmount(transaction.amount);
    setDescription(transaction.description);
    setDate(transaction.date);
    setCategory(transaction.category);
    setShowModal(true);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(user.uid, month, id);
      alert("Transaction deleted successfully!");
    } catch (error) {
      alert("Failed to delete transaction.");
    }
  };

  const clearForm = () => {
    setAmount("");
    setDescription("");
    setDate("");
    setCategory("Needs");
    setTransactionId("");
  };

  const exportToExcel = () => {
    if (transactions.length === 0) {
      alert("No transactions to export.");
      return;
    }

    // Format the transactions for the Excel file
    const formattedData = transactions.map((txn, index) => ({
      No: index + 1,
      Date: txn.date,
      Description: txn.description,
      Category: txn.category,
      Amount: txn.amount,
    }));

    // Create a new workbook and add the data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // Export the workbook to a file
    XLSX.writeFile(workbook, `Transactions_${month}.xlsx`);
  };

  return (
    <div className="p-2 overflow-y h-full text-white">
      <div className="p-2 overflow-y-auto scrollbar-none h-full text-white">
        <div
          className="rounded-lg p-6 shadow-md "
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
                onClick={() => {
                  setShowModal(true);
                  clearForm();
                  setIsEditing(false); // Set to add mode
                }}
              >
                Add Entry
              </button>
              {router == "/expense-tracker" ? (
                <button
                  className="px-4 py-2 rounded hover:bg-green-600"
                  style={{
                    backgroundColor: "var(--gray-700)",
                    color: "var(--text-color)",
                  }}
                  onClick={exportToExcel}
                >
                  Export to Excel
                </button>
              ) : (
                <></>
              )}
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
                  <th className="py-3 px-4">Actions</th>
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
                      <td className="py-3 px-4 space-x-2">
                        <button
                          onClick={() => handleEdit(transaction, ind)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ind)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
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
              <h3 className="text-lg font-semibold">
                {isEditing ? "Edit Expense" : "Add Expense"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  clearForm();
                }}
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
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  clearForm();
                }}
                className="text-red-500 hover:text-red-600"
              >
                Close
              </button>
              <button
                onClick={handleAddOrUpdateTransaction}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
