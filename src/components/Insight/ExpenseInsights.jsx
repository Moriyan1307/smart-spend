import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchMonthlyOverview,
  fetchAccountBalances,
} from "../../utils/firebaseUtils";

const ExpenseInsights = () => {
  const [balances, setBalances] = useState({
    miscellaneousBalance: 0,
    investmentBalance: 0,
    savingsBalance: 0,
  });

  const [overviewData, setOverviewData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const currency = useSelector((state) => state.currency.currency);
  const month = "2024-11";

  const [spentNeeds, setSpentNeeds] = useState(0);
  const [spentWants, setSpentWants] = useState(0);
  const [spentInvestments, setSpentInvestments] = useState(0);

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    const fetchOverviewData = async () => {
      try {
        const data = await fetchMonthlyOverview(user.uid, month);
        setOverviewData(data);

        // Calculate initial allocations and spent amounts
        const { calculatedBudget, budgetRatios, income } = data;
        const initialNeeds = (income * budgetRatios.needs) / 100;
        const initialWants = (income * budgetRatios.wants) / 100;
        const initialInvestments = (income * budgetRatios.investments) / 100;

        setSpentNeeds(initialNeeds - (calculatedBudget.needs || 0));
        setSpentWants(initialWants - (calculatedBudget.wants || 0));
        setSpentInvestments(
          initialInvestments - (calculatedBudget.investments || 0)
        );
      } catch (error) {
        console.error("Error fetching monthly overview:", error);
      }
    };

    fetchOverviewData();
  }, [isLoggedIn, user, month]);

  useEffect(() => {
    const loadBalances = async () => {
      if (!user) return;

      try {
        const accountBalances = await fetchAccountBalances(user.uid);
        setBalances(accountBalances);
      } catch (error) {
        console.error("Error fetching account balances:", error);
      }
    };

    loadBalances();
  }, [user]);

  if (!isLoggedIn) {
    return null;
  }

  if (!overviewData) {
    return <div>No data available for this month.</div>;
  }

  const { calculatedBudget } = overviewData;

  return (
    <div
      className="text-white rounded-lg p-6 shadow-md"
      style={{ backgroundColor: "var(--gray-900)" }}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        Expense Insights
      </h2>

      <section className="mb-6">
        <h3 className="text-green-500 underline font-semibold">Allotment</h3>
        <div className="flex justify-between">
          <span>
            Needs: {currency}
            {(
              (overviewData.budgetRatios.needs * overviewData.income) /
              100
            ).toFixed(2)}
          </span>
          <span>
            Wants: {currency}
            {(
              (overviewData.budgetRatios.wants * overviewData.income) /
              100
            ).toFixed(2)}
          </span>
          <span>
            Investments: {currency}
            {(
              (overviewData.budgetRatios.investments * overviewData.income) /
              100
            ).toFixed(2)}
          </span>
          <span className="font-bold">
            Total: {currency}
            {overviewData.income.toFixed(2)}
          </span>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-green-500 underline font-semibold">Spendings</h3>
        <div className="flex justify-between">
          <span>
            Needs: {currency}
            {spentNeeds.toFixed(2)}
          </span>
          <span>
            Wants: {currency}
            {spentWants.toFixed(2)}
          </span>
          <span className="font-bold">
            Total: {currency}
            {(spentNeeds + spentWants).toFixed(2)}
          </span>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-green-500 underline font-semibold">Money Left</h3>
        <div className="flex justify-between">
          <span>
            Needs: {currency}
            {calculatedBudget.needs.toFixed(2)}
          </span>
          <span>
            Wants: {currency}
            {calculatedBudget.wants.toFixed(2)}
          </span>
          <span className="font-bold">
            Total: {currency}
            {(calculatedBudget.needs + calculatedBudget.wants).toFixed(2)}
          </span>
        </div>
      </section>

      <section>
        <h3 className="text-green-500 underline font-semibold">Savings</h3>
        <div className="flex justify-between">
          <span>Total Savings: </span>
          <span className="font-bold">
            {currency}
            {(
              calculatedBudget.needs +
              calculatedBudget.wants +
              calculatedBudget.investments
            ).toFixed(2)}
          </span>
        </div>
      </section>
    </div>
  );
};

export default ExpenseInsights;
