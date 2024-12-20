import React, { useEffect, useState } from "react";
import { FaExchangeAlt, FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  calculateDaysLeftInMonth,
  fetchAccountBalances,
  fetchMiscAndInvestmentBalances,
  onSnapshotMiscellaneousTransactions,
  onSnapshotMonthlyOverview,
} from "../../utils/firebaseUtils";

const MonthlyOverview = () => {
  const [balances, setBalances] = useState({
    miscellaneousBalance: 0,
    investmentBalance: 0,
    savingsBalance: 0,
  });

  const [overviewData, setOverviewData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const currency = useSelector((state) => state.currency.currency);

  const getCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const month = getCurrentMonth();

  const [spentNeeds, setSpentNeeds] = useState(0);
  const [spentWants, setSpentWants] = useState(0);
  const [spentInvestments, setSpentInvestments] = useState(0);
  const [miscBalance, setMiscBalance] = useState(0);

  useEffect(() => {
    if (
      overviewData &&
      overviewData.calculatedBudget &&
      overviewData.budgetRatios &&
      overviewData.income
    ) {
      const { calculatedBudget, budgetRatios, income } = overviewData;

      // Calculate initial allocations based on budgetRatios and income
      const initialNeeds = (income * budgetRatios.needs) / 100;
      const initialWants = (income * budgetRatios.wants) / 100;
      const initialInvestments = (income * budgetRatios.investments) / 100;

      // Calculate spent amounts
      setSpentNeeds(initialNeeds - (calculatedBudget?.needs || 0));
      setSpentWants(initialWants - (calculatedBudget?.wants || 0));
      setSpentInvestments(
        initialInvestments - (calculatedBudget?.investments || 0)
      );
    }
  }, [overviewData]);

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    const unsubscribeOverview = onSnapshotMonthlyOverview(
      user.uid,
      month,
      setOverviewData
    );

    return () => unsubscribeOverview();
  }, [isLoggedIn, user, month]);

  useEffect(() => {
    const loadBalances = async () => {
      if (user) {
        try {
          const { miscellaneousBalance, investmentBalance } =
            await fetchMiscAndInvestmentBalances(user.uid);
          setBalances({ miscellaneousBalance, investmentBalance });
        } catch (error) {
          console.error("Error loading balances:", error);
        }
      }
    };

    loadBalances();
  }, [user]);

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onSnapshotMiscellaneousTransactions(
        user.uid,
        (accountData) => {
          setMiscBalance(accountData?.balance || 0);
        }
      );

      return () => unsubscribe();
    } else {
      console.warn("User not logged in or user ID is missing.");
      setMiscBalance(0);
    }
  }, [user]);

  if (!isLoggedIn) {
    return null;
  }

  if (!overviewData) {
    return <div>No data available for this month.</div>;
  }

  const daysLeft = calculateDaysLeftInMonth();
  const { calculatedBudget } = overviewData;
  const totalSavings =
    (calculatedBudget?.needs || 0) +
    (calculatedBudget?.wants || 0) +
    (calculatedBudget?.investments || 0);

  if (user) {
    return (
      <div className="text-white rounded-lg p-6 shadow-md w-4/12">
        <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: "var(--gray-800)" }}
        >
          <div className="grid grid-cols-3 gap-4 mb-2 font-semibold">
            <span>Categories</span>
            <span>Spent</span>
            <span>Left</span>
          </div>
          <div
            className="grid grid-cols-3 gap-4 border-b py-2"
            style={{ borderBottomColor: "var(--gray-600)" }}
          >
            <span>Needs</span>
            <span>
              {currency}
              {spentNeeds > 0 ? spentNeeds.toFixed(2) : 0}
            </span>
            <span>
              {currency}
              {calculatedBudget?.needs > 0
                ? calculatedBudget.needs.toFixed(2)
                : 0}
            </span>
          </div>
          <div
            className="grid grid-cols-3 gap-4 border-b py-2"
            style={{ borderBottomColor: "var(--gray-600)" }}
          >
            <span>Wants</span>
            <span>
              {currency}
              {spentWants > 0 ? spentWants.toFixed(2) : 0}
            </span>
            <span>
              {currency}
              {calculatedBudget?.wants > 0
                ? calculatedBudget.wants.toFixed(2)
                : 0}
            </span>
          </div>
          <div
            className="grid grid-cols-3 gap-4 py-2"
            style={{ borderBottomColor: "var(--gray-600)" }}
          >
            <span>Investments</span>
            <span>
              {currency}
              {spentInvestments > 0 ? spentInvestments.toFixed(2) : 0}
            </span>
            <span>
              {currency}
              {calculatedBudget?.investments > 0
                ? calculatedBudget.investments.toFixed(2)
                : 0}
            </span>
          </div>
          <div className="mt-4 font-semibold text-green-500">
            Total Savings: {currency}
            {totalSavings.toFixed(2)}
          </div>
        </div>

        <div className="mt-4 text-right text-gray-400 text-sm">
          {daysLeft} days left
        </div>

        <div
          className="text-white rounded-lg p-6 shadow-md mt-6"
          style={{ backgroundColor: "var(--gray-900)" }}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Savings Account Card */}
            <div
              className="p-4 rounded-lg shadow-sm flex justify-between items-center"
              style={{ backgroundColor: "var(--gray-800)" }}
            >
              <div>
                <h3 className="text-sm text-gray-400">Savings Account</h3>
                <p className="text-2xl font-bold">
                  {currency}
                  0.00
                </p>
              </div>
              <FaExchangeAlt className="text-gray-400" />
            </div>

            {/* Investments Account Card */}
            <div
              className="p-4 rounded-lg shadow-sm flex justify-between items-center"
              style={{ backgroundColor: "var(--gray-800)" }}
            >
              <div>
                <h3 className="text-sm text-gray-400">Investments Account</h3>
                <p className="text-2xl font-bold">
                  {currency}
                  {spentInvestments > 0 ? spentInvestments.toFixed(2) : 0}
                </p>
              </div>
              <FaExchangeAlt className="text-gray-400" />
            </div>

            {/* Miscellaneous Account Card */}
            <div
              className="p-4 rounded-lg shadow-sm flex justify-between items-center"
              style={{ backgroundColor: "var(--gray-800)" }}
            >
              <div>
                <h3 className="text-sm text-gray-400">Miscellaneous Account</h3>
                <p className="text-2xl font-bold">
                  {currency}

                  {miscBalance.toFixed(2)}
                </p>
              </div>
              <FaExchangeAlt className="text-gray-400" />
            </div>

            {/* Monthly Savings Card */}
            <div
              className="p-4 rounded-lg shadow-sm flex justify-between items-center"
              style={{ backgroundColor: "var(--gray-800)" }}
            >
              <div>
                <h3 className="text-sm text-gray-400">{month} Savings</h3>
                <p className="text-2xl font-bold">
                  {currency}
                  {totalSavings.toFixed(2)}
                </p>
              </div>
              <FaExternalLinkAlt className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MonthlyOverview;
