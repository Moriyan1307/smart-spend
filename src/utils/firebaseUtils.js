import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the import path if necessary

// Function to save onboarding financial setup data to Firestore
export const saveFinancialSetup = async (userId, month, financialSetupData) => {
  if (!userId) {
    throw new Error("User not signed in");
  }

  if (!month) {
    throw new Error("Month is not specified");
  }

  const monthDocRef = doc(db, "users", userId, "months", month); // Path to the month's document

  try {
    await setDoc(monthDocRef, financialSetupData, { merge: true });
    console.log("Financial setup saved successfully for", month);
  } catch (error) {
    console.error("Error saving financial setup:", error);
    throw error;
  }
};

// Function to add a transaction to the specified month
export const addTransaction = async (userId, month, transaction) => {
  if (!userId) {
    throw new Error("User not signed in");
  }

  if (!month) {
    throw new Error("Month is not specified");
  }

  const monthDocRef = doc(db, "users", userId, "months", month);

  const transactionWithTimestamp = {
    ...transaction,
    // timestamp: serverTimestamp(), // Add a timestamp to the transaction
  };

  try {
    await updateDoc(monthDocRef, {
      transactions: arrayUnion(transactionWithTimestamp),
    });
    console.log("Transaction added successfully for", month);
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

// Function to fetch transactions for a specific month
export const fetchTransactions = async (userId, month) => {
  if (!userId) {
    throw new Error("User not signed in");
  }

  if (!month) {
    throw new Error("Month is not specified");
  }

  const monthDocRef = doc(db, "users", userId, "months", month);

  try {
    const monthDoc = await getDoc(monthDocRef);
    if (monthDoc.exists()) {
      const data = monthDoc.data();
      return data.transactions || []; // Return transactions if they exist, otherwise an empty array
    } else {
      console.log("No data found for the specified month.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
