import React from "react";

const JobCard = ({ company, title, location, type, salary }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-gray-200 rounded-full p-3 mr-4"></div>
        <div>
          <h3 className="text-lg font-semibold">{company}</h3>
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex items-center text-gray-600 mt-2">
            <span className="mr-4">{location}</span>
            <span className="mr-4">{type}</span>
            <span>{salary}</span>
          </div>
        </div>
      </div>
      <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
        View Details
      </button>
    </div>
  );
};

export default JobCard;
