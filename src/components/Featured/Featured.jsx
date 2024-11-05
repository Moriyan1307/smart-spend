import React from "react";
import { FaExchangeAlt, FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const MonthlyOverview = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  if (isLoggedIn) {
    return (
      <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md w-4/12">
        <h2 className="text-lg font-semibold mb-4">October Overview</h2>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 mb-2 font-semibold">
            <span>Categories</span>
            <span>Spent</span>
            <span>Left</span>
          </div>
          <div className="grid grid-cols-3 gap-4 border-b border-gray-300 py-2">
            <span>Needs</span>
            <span>$578</span>
            <span>$22</span>
          </div>
          <div className="grid grid-cols-3 gap-4 border-b border-gray-300 py-2">
            <span>Wants</span>
            <span>$0</span>
            <span>$360</span>
          </div>
          <div className="mt-4 text-green-600 font-semibold">
            Total Savings: $622
          </div>
        </div>
        <div className="mt-4 text-right text-gray-500 text-sm">7 days left</div>

        <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md mt-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Savings Account Card */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-sm text-gray-500">Savings Account</h3>
                <p className="text-2xl font-bold">$0</p>
              </div>
              <FaExchangeAlt className="text-gray-400" />
            </div>

            {/* Investments Account Card */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-sm text-gray-500">Investments Account</h3>
                <p className="text-2xl font-bold">$0</p>
              </div>
              <FaExchangeAlt className="text-gray-400" />
            </div>

            {/* Miscellaneous Account Card */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-sm text-gray-500">Miscellaneous Account</h3>
                <p className="text-2xl font-bold">$0</p>
              </div>
              <FaExchangeAlt className="text-gray-400" />
            </div>

            {/* October Savings Card */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-sm text-gray-500">October Savings</h3>
                <p className="text-2xl font-bold">$622</p>
              </div>
              <FaExternalLinkAlt className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    );
  } else null;
};

export default MonthlyOverview;
