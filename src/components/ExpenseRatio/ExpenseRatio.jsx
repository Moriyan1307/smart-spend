import React, { useState } from "react";

const BudgetCalculator = () => {
  // State management for form data
  const [currency, setCurrency] = useState("USD");
  const [monthlyIncome, setMonthlyIncome] = useState(1200);
  const [ratio, setRatio] = useState("50-30-20");
  const [needs, setNeeds] = useState(600);
  const [wants, setWants] = useState(360);
  const [investments, setInvestments] = useState(240);

  // Handle ratio change
  const handleRatioChange = (newRatio) => {
    setRatio(newRatio);
    if (newRatio === "50-30-20") {
      // Standard ratio calculation
      setNeeds(monthlyIncome * 0.5);
      setWants(monthlyIncome * 0.3);
      setInvestments(monthlyIncome * 0.2);
    }
  };

  // Handle custom input change
  const handleIncomeChange = (e) => {
    const value = parseFloat(e.target.value);
    setMonthlyIncome(value);

    // Update values if using standard ratio
    if (ratio === "50-30-20") {
      setNeeds(value * 0.5);
      setWants(value * 0.3);
      setInvestments(value * 0.2);
    }
  };

  return (
    <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md mt-6 max-w-lg mx-auto">
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
