import React, { useState } from "react";

const BudgetCalculator = () => {
  // State management for form data
  const [currency, setCurrency] = useState("USD");
  const [monthlyIncome, setMonthlyIncome] = useState(1200);
  const [ratio, setRatio] = useState("50-30-20");
  const [needsRatio, setNeedsRatio] = useState(50);
  const [wantsRatio, setWantsRatio] = useState(30);
  const [investmentsRatio, setInvestmentsRatio] = useState(20);
  const [needs, setNeeds] = useState(600);
  const [wants, setWants] = useState(360);
  const [investments, setInvestments] = useState(240);

  // Handle ratio change
  const handleRatioChange = (newRatio) => {
    setRatio(newRatio);
    if (newRatio === "50-30-20") {
      // Reset to standard ratio
      setNeedsRatio(50);
      setWantsRatio(30);
      setInvestmentsRatio(20);
      updateBudget(50, 30, 20);
    }
  };

  // Update budget based on ratios
  const updateBudget = (
    needsPercentage,
    wantsPercentage,
    investmentsPercentage
  ) => {
    setNeeds((monthlyIncome * needsPercentage) / 100);
    setWants((monthlyIncome * wantsPercentage) / 100);
    setInvestments((monthlyIncome * investmentsPercentage) / 100);
  };

  // Handle custom input change
  const handleIncomeChange = (e) => {
    const value = parseFloat(e.target.value);
    setMonthlyIncome(value);

    // Update values based on current ratios
    updateBudget(needsRatio, wantsRatio, investmentsRatio);
  };

  // Handle custom ratio input
  const handleCustomRatioChange = (type, value) => {
    const percentage = parseInt(value);
    if (type === "needs") setNeedsRatio(percentage);
    if (type === "wants") setWantsRatio(percentage);
    if (type === "investments") setInvestmentsRatio(percentage);

    // Update budget dynamically
    updateBudget(
      type === "needs" ? percentage : needsRatio,
      type === "wants" ? percentage : wantsRatio,
      type === "investments" ? percentage : investmentsRatio
    );
  };

  return (
    <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md mt-6 w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Tailor Your Monthly Budget and Expense Ratio
      </h2>

      {/* Monthly Income Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Monthly Income <span className="text-gray-400">(i)</span>
        </label>
        <div className="flex items-center space-x-2">
          <select
            className="bg-gray-100 border border-gray-300 rounded px-2 py-2"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <input
            type="number"
            className="bg-gray-100 border border-gray-300 rounded w-full px-3 py-2"
            value={monthlyIncome}
            onChange={handleIncomeChange}
          />
        </div>
      </div>

      {/* Ratio Options */}
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="ratio"
              className="form-radio text-green-500"
              checked={ratio === "50-30-20"}
              onChange={() => handleRatioChange("50-30-20")}
            />
            <span>50-30-20</span>
            <span className="text-gray-500 text-sm">
              Continue with the standard ratio.
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="ratio"
              className="form-radio text-green-500"
              checked={ratio === "Custom"}
              onChange={() => handleRatioChange("Custom")}
            />
            <span>Custom</span>
            <span className="text-gray-500 text-sm">Customize my ratio.</span>
          </label>
        </div>
      </div>

      {/* Custom Ratio Inputs */}
      {ratio === "Custom" && (
        <div className="mb-4 bg-gray-100 p-4 rounded">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Need ratio
              </label>
              <input
                type="number"
                className="bg-gray-100 border border-gray-300 rounded w-full px-3 py-2"
                value={needsRatio}
                onChange={(e) =>
                  handleCustomRatioChange("needs", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Want ratio
              </label>
              <input
                type="number"
                className="bg-gray-100 border border-gray-300 rounded w-full px-3 py-2"
                value={wantsRatio}
                onChange={(e) =>
                  handleCustomRatioChange("wants", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Investment ratio
              </label>
              <input
                type="number"
                className="bg-gray-100 border border-gray-300 rounded w-full px-3 py-2"
                value={investmentsRatio}
                onChange={(e) =>
                  handleCustomRatioChange("investments", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Budget Breakdown */}
      <div className="mb-4 bg-gray-100 p-4 rounded">
        <div className="flex justify-between">
          <span>Needs:</span>
          <span className="font-semibold">${needs.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Wants:</span>
          <span className="font-semibold">${wants.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Investments:</span>
          <span className="font-semibold">${investments.toFixed(2)}</span>
        </div>
      </div>

      {/* Save Button */}
      <button className="bg-green-500 text-white w-full py-3 rounded hover:bg-green-600">
        Save
      </button>
    </div>
  );
};

export default BudgetCalculator;
