import React from "react";

const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="flex space-x-4">
      <button
        className={`px-4 py-2 rounded-md ${
          activeTab === "fullTime"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-600"
        }`}
        onClick={() => setActiveTab("fullTime")}
      >
        Full Time Jobs
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          activeTab === "internships"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-600"
        }`}
        onClick={() => setActiveTab("internships")}
      >
        Internships
      </button>
    </nav>
  );
};

export default Navigation;
