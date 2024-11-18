"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addSavingsTransaction,
  fetchSavingsAccount,
} from "../../utils/firebaseUtils";

const SavingsAccount = () => {
  const [transactions, setTransactions] = useState([]);
  // const user = useSelector((state) => state.auth.user);
  const currency = useSelector((state) => state.currency.currency);

  // useEffect(() => {
  //   const loadSavingsData = async () => {
  //     if (user) {
  //       try {
  //         const data = await fetchSavingsAccount(user.uid);
  //         console.log("Fetched data:", data);
  //         setTransactions(data || []);
  //       } catch (error) {
  //         console.error("Error fetching savings account data:", error);
  //       }
  //     }
  //   };

  //   loadSavingsData();
  // }, [user]);

  // Calculate balance from transactions

  // Function to add a savings transaction manually
  // const handleAddTransaction = async () => {
  //   if (user) {
  //     try {
  //       await addSavingsTransaction(user.uid, "October", 200); // Example: adding $200 for October
  //       const updatedData = await fetchSavingsAccount(user.uid); // Fetch updated data
  //       setTransactions(updatedData || []);
  //     } catch (error) {
  //       console.error("Error adding savings transaction:", error);
  //     }
  //   }
  // };

  return (
    <div
      className="p-6 text-white rounded-lg"
      style={{
        backgroundColor: "var(--gray-900)",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="text-center w-full">
          <p className="text-4xl font-semibold">
            {currency}
            0.00
          </p>
          <p className="text-gray-400 text-lg">Savings Balance</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-4">
        <p className="text-center text-gray-500 py-8">
          Your monthly savings and money transfers will appear here.
        </p>
      </div>

      {/* <div className="text-center mt-6">
        <button
          onClick={handleAddTransaction}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Add Example Transaction
        </button>
      </div> */}
    </div>
  );
};

export default SavingsAccount;
