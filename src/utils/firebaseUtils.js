import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  getDoc,
  onSnapshot,
  arrayRemove,
  deleteField,
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
// export const addTransaction = async (userId, month, transaction) => {
//   if (!userId) {
//     throw new Error("User not signed in");
//   }

//   if (!month) {
//     throw new Error("Month is not specified");
//   }

//   const monthDocRef = doc(db, "users", userId, "months", month);

//   const transactionWithTimestamp = {
//     ...transaction,
//     // timestamp: serverTimestamp(), // Add a timestamp to the transaction
//   };

//   try {
//     await updateDoc(monthDocRef, {
//       transactions: arrayUnion(transactionWithTimestamp),
//     });
//     console.log("Transaction added successfully for", month);
//   } catch (error) {
//     console.error("Error adding transaction:", error);
//     throw error;
//   }
// };

export const addTransaction = async (userId, month, transaction) => {
  if (!userId || !month || !transaction) {
    throw new Error("Invalid parameters");
  }

  // Reference to the user's month document in Firestore
  const monthDocRef = doc(db, "users", userId, "months", month);

  // Fetch the current budget data for the month
  const monthDoc = await getDoc(monthDocRef);
  if (!monthDoc.exists()) {
    throw new Error("Month document does not exist");
  }

  const monthData = monthDoc.data();
  const income = monthData.income;
  const remainingBudget = monthData.calculatedBudget || {
    needs: 0,
    wants: 0,
    investments: 0,
  };

  // Deduct the transaction amount from the appropriate category
  const updatedBudget = { ...remainingBudget };
  const category = transaction.category.toLowerCase();
  const rem = updatedBudget[category];

  if (updatedBudget[category] !== undefined) {
    updatedBudget[category] -= transaction.amount;

    if (updatedBudget[category] < 0) {
      throw new Error(
        `Insufficient funds in ${transaction.category} available funds are ${rem}`
      );
    }
  } else {
    throw new Error(`Invalid category: ${transaction.category}`);
  }

  try {
    // Add the transaction to the Firestore array
    await updateDoc(monthDocRef, {
      transactions: arrayUnion(transaction),
      calculatedBudget: updatedBudget,

      // Update the remaining budget after deduction
    });

    console.log("Transaction added and budget updated successfully");
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw new Error("Failed to add transaction and update budget");
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

export const fetchMonthlyOverview = async (userId, month) => {
  if (!userId || !month) {
    throw new Error("Invalid parameters for fetching monthly overview.");
  }

  const monthDocRef = doc(db, "users", userId, "months", month);
  const monthDoc = await getDoc(monthDocRef);

  console.log(monthDoc);

  if (!monthDoc.exists()) {
    throw new Error("Month document does not exist.");
  }

  return monthDoc.data();
};

// Real-time function to fetch transactions with onSnapshot
export const onSnapshotTransactions = (userId, month, callback) => {
  if (!userId || !month) {
    throw new Error("Invalid parameters for fetching real-time transactions.");
  }

  const monthDocRef = doc(db, "users", userId, "months", month);

  return onSnapshot(
    monthDocRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        callback(data.transactions || []); // Pass transactions data to callback
      } else {
        console.log("No data found for the specified month.");
        callback([]); // Pass empty array if no transactions found
      }
    },
    (error) => {
      console.error("Error fetching real-time transactions:", error);
    }
  );
};

// Real-time function to fetch monthly overview with onSnapshot
export const onSnapshotMonthlyOverview = (userId, month, callback) => {
  if (!userId || !month) {
    throw new Error(
      "Invalid parameters for fetching real-time monthly overview."
    );
  }

  const monthDocRef = doc(db, "users", userId, "months", month);

  return onSnapshot(
    monthDocRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        callback(docSnapshot.data()); // Pass the data to the callback
      } else {
        console.log("Month document does not exist.");
        callback(null); // Pass null if document does not exist
      }
    },
    (error) => {
      console.error("Error fetching real-time monthly overview:", error);
    }
  );
};

export const fetchCurrencyFromFirebase = async (userId, month) => {
  if (!userId) {
    throw new Error("User not signed in");
  }

  const monthDocRef = doc(db, "users", userId, "months", month);
  const userMonthDoc = await getDoc(monthDocRef);

  if (!userMonthDoc.exists()) {
    console.error("No settings found for user");
    return null;
  }

  const data = userMonthDoc.data();
  return data.currency || "$"; // Default to USD if no currency found
};

// Function to fetch balances from a single user document containing account maps
export const fetchAccountBalances = async (userId) => {
  if (!userId) {
    throw new Error("User not signed in");
  }

  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const data = userDoc.data();
    const miscellaneousBalance = data.miscellaneousAccount?.balance || 0; // Fetch from map
    const investmentBalance = data.investmentsAccount?.balance || 0; // Fetch from map
    const savingsBalance = data.savingsAccount || 0; // Fetch savings balance

    return {
      miscellaneousBalance,
      investmentBalance,
      savingsBalance,
    };
  } else {
    console.error("User document does not exist.");
    return {
      miscellaneousBalance: 0,
      investmentBalance: 0,
      savingsBalance: 0,
    };
  }
};

// Function to update a specific transaction in Firestore
export const updateTransaction = async (
  userId,
  month,
  transactionId,
  updatedTransaction
) => {
  const monthDocRef = doc(db, "users", userId, "months", month);

  try {
    const transactionRef = `${transactionId}`;
    await updateDoc(monthDocRef, {
      [`transactions.${transactionRef}`]: updatedTransaction,
    });
    console.log("Transaction updated successfully");
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

// Function to delete a specific transaction in Firestore
export const deleteTransaction = async (userId, month, transactionId) => {
  const monthDocRef = doc(db, "users", userId, "months", month);

  try {
    const transactionRef = `${transactionId}`;
    await updateDoc(monthDocRef, {
      [`transactions.${transactionRef}`]: deleteField(),
    });
    console.log("Transaction deleted successfully");
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

// Function to calculate the remaining days in the current month
export const calculateDaysLeftInMonth = () => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last date of the current month
  const timeDifference = lastDayOfMonth - today;

  // Calculate days left by converting milliseconds to days
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft;
};
