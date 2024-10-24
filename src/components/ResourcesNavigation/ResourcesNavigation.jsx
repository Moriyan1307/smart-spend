import React from "react";

const ResourcesTopNavigation = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex items-center justify-start py-4 px-6 bg-white border-b">
      <button
        onClick={() => onTabChange("career")}
        className={`mr-4 px-4 py-2 rounded-md ${
          activeTab === "career"
            ? "bg-gray-200 text-black"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Career Development
      </button>
      <button
        onClick={() => onTabChange("mentorship")}
        className={`px-4 py-2 rounded-md ${
          activeTab === "mentorship"
            ? "bg-gray-200 text-black"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Mentorship Program
      </button>
    </nav>
  );
};

export default ResourcesTopNavigation;