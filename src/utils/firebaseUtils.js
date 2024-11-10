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
// export const saveFinancialSetup = async (userId, month, financialSetupData) => {
//   if (!userId) {
//     throw new Error("User not signed in");
//   }

//   if (!month) {
//     throw new Error("Month is not specified");
//   }

//   const monthDocRef = doc(db, "users", userId, "months", month); // Path to the month's document

//   try {
//     await setDoc(monthDocRef, financialSetupData, { merge: true });
//     console.log("Financial setup saved successfully for", month);
//   } catch (error) {
//     console.error("Error saving financial setup:", error);
//     throw error;
//   }
// };

export const saveFinancialSetup = async (userId, month, financialSetupData) => {
  if (!userId || !month || !financialSetupData) {
    throw new Error("Invalid parameters for saving financial setup.");
  }

  const userDocRef = doc(db, "users", userId); // Reference for the user document
  const monthDocRef = doc(db, "users", userId, "months", month); // Reference for the specific month document

  try {
    // Store global financial setup data in the user document
    await setDoc(
      userDocRef,
      {
        income: financialSetupData.income,
        currency: financialSetupData.currency,
        budgetRatios: financialSetupData.budgetRatios,
      },
      { merge: true } // Use merge to update existing data without overwriting
    );

    // Store month-specific financial setup data in the month document
    await setDoc(
      monthDocRef,
      {
        income: financialSetupData.income,
        currency: financialSetupData.currency,
        ratioType: financialSetupData.ratioType,
        budgetRatios: financialSetupData.budgetRatios,
        calculatedBudget: financialSetupData.calculatedBudget,
      },
      { merge: true }
    );

    console.log("Financial setup saved successfully!");
  } catch (error) {
    console.error("Error saving financial setup:", error);
    throw error;
  }
};

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

export const onSnapshotBudget = (userId, month, callback) => {
  if (!userId || !month) {
    throw new Error("Invalid parameters for fetching real-time transactions.");
  }

  const monthDocRef = doc(db, "users", userId, "months", month);

  return onSnapshot(
    monthDocRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        callback(data.calculatedBudget || []); // Pass transactions data to callback
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

export const updateTransaction = async (
  userId,
  month,
  transactionIndex,
  updatedTransaction
) => {
  const monthDocRef = doc(db, "users", userId, "months", month);

  try {
    // Fetch the current month document and transaction array
    const monthDoc = await getDoc(monthDocRef);
    if (!monthDoc.exists()) {
      throw new Error("Month document does not exist");
    }

    const monthData = monthDoc.data();
    const transactions = monthData.transactions || [];
    const remainingBudget = monthData.calculatedBudget || {
      needs: 0,
      wants: 0,
      investments: 0,
    };

    // Ensure the transaction index is valid
    if (transactionIndex < 0 || transactionIndex >= transactions.length) {
      throw new Error("Invalid transaction index");
    }

    // Retrieve the original transaction
    const originalTransaction = transactions[transactionIndex];
    const category = originalTransaction.category.toLowerCase();

    // Calculate the difference between the original and updated transaction amounts
    const amountDifference =
      updatedTransaction.amount - originalTransaction.amount;

    // Update the budget based on the difference
    const updatedBudget = { ...remainingBudget };

    if (updatedBudget[category] !== undefined) {
      updatedBudget[category] -= amountDifference;

      // Check if the update causes the budget to go negative
      if (updatedBudget[category] < 0) {
        throw new Error(
          `Insufficient funds in ${originalTransaction.category}. Available funds are ${remainingBudget[category]}`
        );
      }
    } else {
      throw new Error(`Invalid category: ${originalTransaction.category}`);
    }

    // Update the transaction in the array
    const updatedTransactions = [...transactions];
    updatedTransactions[transactionIndex] = {
      ...originalTransaction,
      ...updatedTransaction,
    };

    // Write the updated transactions and budget back to Firestore
    await updateDoc(monthDocRef, {
      transactions: updatedTransactions,
      calculatedBudget: updatedBudget,
    });

    console.log("Transaction and budget updated successfully");
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

// Function to delete a transaction by index in Firestore
export const deleteTransaction = async (userId, month, index) => {
  const monthDocRef = doc(db, "users", userId, "months", month);

  try {
    // Fetch the current month document
    const monthDoc = await getDoc(monthDocRef);
    if (monthDoc.exists()) {
      const monthData = monthDoc.data();
      const transactions = monthData.transactions || [];

      console.log(index);

      console.log(transactions);

      console.log("Original Transactions:", transactions);

      // Check if the index is within the bounds of the array
      if (index < 0 || index >= transactions.length) {
        console.warn(`Invalid index ${index}. No transaction deleted.`);
        return;
      }

      // Use splice to remove the transaction at the specified index
      transactions.splice(index, 1);

      console.log("Updated Transactions (after delete):", transactions);

      // Write the updated transactions array back to Firestore
      await updateDoc(monthDocRef, {
        transactions: transactions,
      });

      console.log("Transaction deleted successfully");
    } else {
      throw new Error("Month document not found");
    }
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

export const onSnapshotAccountTransactions = (
  userId,
  accountType,
  callback
) => {
  if (!userId || !accountType) {
    throw new Error("Invalid parameters for fetching real-time transactions.");
  }

  const userDocRef = doc(db, "users", userId);

  return onSnapshot(
    userDocRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const transactions = data[accountType]?.transactions || [];
        callback(transactions); // Pass the transactions data to the callback
      } else {
        console.log("No data found for the specified account.");
        callback([]); // Pass empty array if no transactions found
      }
    },
    (error) => {
      console.error("Error fetching real-time transactions:", error);
    }
  );
};

export const addTransactionToAccount = async (
  userId,
  accountType,
  transaction
) => {
  if (!userId || !accountType || !transaction) {
    throw new Error("Invalid parameters for adding a transaction.");
  }

  const userDocRef = doc(db, "users", userId);

  try {
    await updateDoc(userDocRef, {
      [`${accountType}.transactions`]: arrayUnion(transaction),
    });
    console.log("Transaction added successfully.");
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

export const onSnapshotMiscellaneousTransactions = (userId, callback) => {
  if (!userId) {
    throw new Error("Invalid userId parameter");
  }

  const userDocRef = doc(db, "users", userId);

  return onSnapshot(
    userDocRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const miscAccountData = data.miscellaneousAccount || {
          balance: 0,
          transactions: [],
        };
        callback(miscAccountData);
      } else {
        console.log("No data found for the specified user.");
        callback({ balance: 0, transactions: [] }); // Default if no data found
      }
    },
    (error) => {
      console.error(
        "Error fetching real-time miscellaneous transactions:",
        error
      );
    }
  );
};

export const addMiscellaneousTransaction = async (userId, transaction) => {
  if (!userId || !transaction) {
    throw new Error("Invalid parameters");
  }

  const userDocRef = doc(db, "users", userId);

  try {
    // Fetch the current miscellaneous account data
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const miscAccount = userData.miscellaneousAccount || {
        balance: 0,
        transactions: [],
      };

      // Update balance and add transaction
      const updatedBalance = miscAccount.balance + transaction.amount;
      const updatedTransactions = arrayUnion(transaction);

      await updateDoc(userDocRef, {
        "miscellaneousAccount.balance": updatedBalance,
        "miscellaneousAccount.transactions": updatedTransactions,
      });

      console.log("Miscellaneous transaction added successfully");
    } else {
      throw new Error("User document not found");
    }
  } catch (error) {
    console.error("Error adding miscellaneous transaction:", error);
    throw error;
  }
};

export const getTotalMiscellaneousAmount = async (userId) => {
  if (!userId) {
    throw new Error("Invalid userId parameter.");
  }

  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const miscAccount = userDoc.data().miscellaneousAccount;

      if (miscAccount && miscAccount.transactions) {
        // Sum up all transaction amounts in the miscellaneous account
        const totalAmount = miscAccount.transactions.reduce(
          (sum, txn) => sum + txn.amount,
          0
        );
        return totalAmount;
      } else {
        console.log("No transactions found in miscellaneous account.");
        return 0;
      }
    } else {
      throw new Error("User document not found.");
    }
  } catch (error) {
    console.error("Error fetching total miscellaneous amount:", error);
    throw error;
  }
};

export const getTotalInvestmentAmount = async (userId) => {
  if (!userId) {
    throw new Error("Invalid userId parameter.");
  }

  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const investmentAccount = userDoc.data().investmentAccount;

      if (investmentAccount && investmentAccount.transactions) {
        // Sum up all transaction amounts in the investment account
        const totalAmount = investmentAccount.transactions.reduce(
          (sum, txn) => sum + txn.amount,
          0
        );
        return totalAmount;
      } else {
        console.log("No transactions found in investment account.");
        return 0;
      }
    } else {
      throw new Error("User document not found.");
    }
  } catch (error) {
    console.error("Error fetching total investment amount:", error);
    throw error;
  }
};

export const addInvestmentTransaction = async (userId, month, transaction) => {
  if (!userId || !month || !transaction || !transaction.amount) {
    throw new Error("Invalid parameters for adding investment transaction.");
  }

  const monthDocRef = doc(db, "users", userId, "months", month);
  const userDocRef = doc(db, "users", userId);

  try {
    // Fetch the current month document to get the budget data
    const monthDoc = await getDoc(monthDocRef);
    if (!monthDoc.exists()) {
      throw new Error("Month document does not exist.");
    }

    const monthData = monthDoc.data();
    const currentBudget = monthData.calculatedBudget || { investments: 0 };

    // Fetch the user document to get the investment account data
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User document does not exist.");
    }

    const userData = userDoc.data();
    const currentInvestmentAccount = userData.investmentAccount || {
      balance: 0,
      transactions: [],
    };

    // Update the calculated budget by deducting the transaction amount from investments
    const updatedBudget = {
      ...currentBudget,
      investments: currentBudget.investments - transaction.amount,
    };

    // Perform both updates in Firestore
    await updateDoc(monthDocRef, {
      calculatedBudget: updatedBudget,
    });

    try {
      await updateDoc(userDocRef, {
        ["investmentsAccount.transactions"]: arrayUnion(transaction),
      });
      console.log("Transaction added successfully.");
    } catch (error) {
      console.error("Error adding transaction:", error);
      throw error;
    }

    console.log(
      "Investment transaction added and budget updated successfully."
    );
  } catch (error) {
    console.error("Error adding investment transaction:", error);
    throw error;
  }
};
export const calculateDaysLeftInMonth = () => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last date of the current month
  const timeDifference = lastDayOfMonth - today;

  // Calculate days left by converting milliseconds to days
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft;
};

export const fetchSavingsAccount = async (userId) => {
  if (!userId) {
    throw new Error("Invalid userId for fetching savings account.");
  }

  const userDocRef = doc(db, "users", userId);

  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.savingsAccount || [];
    } else {
      console.log("User document does not exist.");
      return { balance: 0, transactions: [] };
    }
  } catch (error) {
    console.error("Error fetching savings account:", error);
    throw error;
  }
};

export const addSavingsTransaction = async (userId, month, amount) => {
  if (!userId || !month || amount === undefined) {
    throw new Error("Invalid parameters for adding savings transaction.");
  }

  const userDocRef = doc(db, "users", userId);

  try {
    // Fetch the current savings account data
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.exists() ? userDoc.data() : {};
    const savingsAccount = userData.savingsAccount || [];

    // Add the new transaction to the savingsAccount array
    savingsAccount.push({
      month,
      amount,
    });

    // Write the updated savings account back to Firestore
    await updateDoc(userDocRef, {
      savingsAccount: savingsAccount,
    });

    console.log("Savings transaction added successfully.");
  } catch (error) {
    console.error("Error adding savings transaction:", error);
    throw error;
  }
};

export const fetchDuesData = async (userId, type) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const data = userDoc.data();
    return data.dues?.[type] || { balance: 0, transactions: [] };
  }
  return { balance: 0, transactions: [] };
};

// Add a due transaction to payable or receivable
export const addDueTransaction = async (userId, type, transaction) => {
  const userDocRef = doc(db, "users", userId);

  // Fetch current dues data
  const userDoc = await getDoc(userDocRef);
  const userData = userDoc.exists() ? userDoc.data() : {};
  const dues = userData.dues || {
    payable: { balance: 0, transactions: [] },
    receivable: { balance: 0, transactions: [] },
  };

  // Update balance and transactions
  const updatedBalance = dues[type].balance + transaction.amount;
  const updatedTransactions = [
    ...dues[type].transactions,
    { ...transaction, status: type === "payable" ? "unpaid" : "not_received" },
  ];

  // Write updated dues data back to Firestore
  await updateDoc(userDocRef, {
    [`dues.${type}.balance`]: updatedBalance,
    [`dues.${type}.transactions`]: updatedTransactions,
  });
};

export const fetchMiscAndInvestmentBalances = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to fetch account balances.");
  }

  const userDocRef = doc(db, "users", userId);

  try {
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const miscellaneousBalance = userData.miscellaneousAccount?.balance || 0;
      const investmentBalance = userData.investmentsAccount?.balance || 0;

      return {
        miscellaneousBalance,
        investmentBalance,
      };
    } else {
      console.log("User document does not exist.");
      return {
        miscellaneousBalance: 0,
        investmentBalance: 0,
      };
    }
  } catch (error) {
    console.error("Error fetching balances:", error);
    throw error;
  }
};
