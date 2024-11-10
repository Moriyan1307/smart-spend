import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase"; // Adjust the import path if necessary
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { saveFinancialSetup } from "../../utils/firebaseUtils";

export default function FinancialSetup() {
  const [income, setIncome] = useState("");
  const [ratio, setRatio] = useState("standard");
  const [needsRatio, setNeedsRatio] = useState(50);
  const [wantsRatio, setWantsRatio] = useState(30);
  const [investmentsRatio, setInvestmentsRatio] = useState(20);
  const [needs, setNeeds] = useState(0);
  const [wants, setWants] = useState(0);
  const [investments, setInvestments] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("$");
  const [user, setUser] = useState(null);

  const router = useRouter();

  const currencies = [
    { code: "USD", name: "United States Dollar", icon: "$" },
    { code: "GBP", name: "British Pound Sterling", icon: "£" },
    { code: "EUR", name: "Euro", icon: "€" },
    { code: "INR", name: "Indian Rupee", icon: "₹" },
  ];

  const getCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Pad with '0' if needed
    return `${year}-${month}`;
  };

  const month = getCurrentMonth();

  useEffect(() => {
    // Monitor auth state and set the user
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleIncomeChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setIncome(e.target.value);
    calculateBudget(value);
  };

  const handleRatioChange = (e) => {
    setRatio(e.target.value);
    calculateBudget(parseFloat(income) || 0);
  };

  const handleCurrencyChange = (e) => {
    const selected = currencies.find(
      (currency) => currency.code === e.target.value
    );
    setSelectedCurrency(selected ? selected.icon : "$");
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value); // Update the selected month
  };

  const calculateBudget = (incomeValue) => {
    if (ratio === "standard") {
      setNeeds((incomeValue * 50) / 100);
      setWants((incomeValue * 30) / 100);
      setInvestments((incomeValue * 20) / 100);
    } else {
      setNeeds((incomeValue * needsRatio) / 100);
      setWants((incomeValue * wantsRatio) / 100);
      setInvestments((incomeValue * investmentsRatio) / 100);
    }
  };

  const handleCustomRatioChange = () => {
    calculateBudget(parseFloat(income) || 0);
  };

  const handleSave = async () => {
    const financialSetupData = {
      income: parseFloat(income),
      currency: selectedCurrency,
      ratioType: ratio,
      budgetRatios: {
        needs: needsRatio,
        wants: wantsRatio,
        investments: investmentsRatio,
      },
      calculatedBudget: {
        needs,
        wants,
        investments,
      },
    };

    try {
      await saveFinancialSetup(user.uid, month, financialSetupData);
      alert("Financial setup saved successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Failed to save financial setup. Please try again.");
    }
  };

  return (
    <div className="w-2/6 mx-auto p-8 bg-gray-900 text-white rounded-lg text-center">
      <h2 className="text-2xl font-semibold mb-6">
        Financial Setup: Let's Get Started
      </h2>

      <label className="block text-left mb-2">Monthly Income</label>
      <div className="flex items-center space-x-2 mb-6">
        <select
          onChange={handleCurrencyChange}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          {currencies.map((ind) => (
            <option key={ind.code} value={ind.code}>
              {ind.code}
            </option>
          ))}
        </select>

        <input
          placeholder="Enter your monthly income here."
          value={income}
          onChange={handleIncomeChange}
          className="flex-1 p-2 bg-gray-800 text-white rounded-md placeholder-gray-400"
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="standard"
            checked={ratio === "standard"}
            onChange={handleRatioChange}
            className="text-green-500"
          />
          <div className="flex flex-col">
            <span className="text-left">50-30-20</span>
            <span className="text-gray-400 text-sm">
              Continue with the standard ratio.
            </span>
          </div>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="custom"
            checked={ratio === "custom"}
            onChange={handleRatioChange}
            className="text-green-500"
          />
          <div className="flex flex-col">
            <span className="text-left">Custom</span>
            <span className="text-gray-400 text-sm">Customize my ratio</span>
          </div>
        </label>
      </div>

      {ratio === "custom" && (
        <div className="flex justify-between bg-gray-800 p-4 rounded-md mb-6 space-x-4">
          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-400 mb-1">Need ratio</label>
            <input
              type="number"
              value={needsRatio}
              onChange={(e) => {
                setNeedsRatio(parseFloat(e.target.value) || 0);
                handleCustomRatioChange();
              }}
              className="w-24 p-2 bg-gray-700 text-white rounded-md text-center"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-400 mb-1">Want ratio</label>
            <input
              type="number"
              value={wantsRatio}
              onChange={(e) => {
                setWantsRatio(parseFloat(e.target.value) || 0);
                handleCustomRatioChange();
              }}
              className="w-24 p-2 bg-gray-700 text-white rounded-md text-center"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-400 mb-1">
              Investment ratio
            </label>
            <input
              type="number"
              value={investmentsRatio}
              onChange={(e) => {
                setInvestmentsRatio(parseFloat(e.target.value) || 0);
                handleCustomRatioChange();
              }}
              className="w-24 p-2 bg-gray-700 text-white rounded-md text-center"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 bg-gray-800 p-4 rounded-md mb-6 text-center">
        <div>
          <p className="text-gray-400 text-sm">Needs</p>
          <p className="text-white font-semibold">
            {selectedCurrency} {needs.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Wants</p>
          <p className="text-white font-semibold">
            {selectedCurrency} {wants.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Investments</p>
          <p className="text-white font-semibold">
            {selectedCurrency} {investments.toFixed(2)}
          </p>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2 bg-green-600 rounded-md hover:bg-green-700 font-semibold"
      >
        Continue to Dashboard
      </button>
    </div>
  );
}
