import React from "react";

const MonthlyOverview = () => {
  return (
    <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-semibold mb-4">October Overview</h2>
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Categories</span>
          <span className="font-semibold">Spent</span>
          <span className="font-semibold">Left</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 py-2">
          <span>Needs</span>
          <span>$578</span>
          <span>$22</span>
        </div>
        <div className="flex justify-between border-b border-gray-300 py-2">
          <span>Wants</span>
          <span>$0</span>
          <span>$360</span>
        </div>
        <div className="mt-4 text-green-600 font-semibold">
          Total Savings: $622
        </div>
      </div>
      <div className="mt-4 text-right text-gray-500 text-sm">7 days left</div>
    </div>
  );
};

export default MonthlyOverview;
