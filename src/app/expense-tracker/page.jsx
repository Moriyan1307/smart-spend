"use client";

import AccountOverview from "../../components/AccountOverview/AccountOverview";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="p-2 overflow-y-auto scrollbar-none h-full ">
      <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">October Entries</h2>
          <div className="flex space-x-2">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
              Export
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-gray-900">
              Add Entry
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 rounded-lg shadow-sm">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Needs</th>
                <th className="py-3 px-4">Wants</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample Row 1 */}
              <tr className="border-b border-gray-300">
                <td className="py-3 px-4">16 Oct · 7:00 PM</td>
                <td className="py-3 px-4">IFL</td>
                <td className="py-3 px-4">$18</td>
                <td className="py-3 px-4 text-gray-500">N/A</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
              {/* Sample Row 2 */}
              <tr className="border-b border-gray-300">
                <td className="py-3 px-4">16 Oct · 7:00 PM</td>
                <td className="py-3 px-4">Rent</td>
                <td className="py-3 px-4">$360</td>
                <td className="py-3 px-4 text-gray-500">N/A</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
              {/* Sample Row 3 */}
              <tr>
                <td className="py-3 px-4">16 Oct · 7:00 PM</td>
                <td className="py-3 px-4">Groceries</td>
                <td className="py-3 px-4">$200</td>
                <td className="py-3 px-4 text-gray-500">N/A</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
