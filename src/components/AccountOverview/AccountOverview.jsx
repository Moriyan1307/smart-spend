import React from "react";
import { FaExchangeAlt, FaExternalLinkAlt } from "react-icons/fa";

const AccountOverview = () => {
  return (
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
  );
};

export default AccountOverview;
