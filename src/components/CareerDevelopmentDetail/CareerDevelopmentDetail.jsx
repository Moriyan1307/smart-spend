// ResourceDetail.js
import React from 'react';

const CareerDevelopmentDetail = ({ resource, onClose }) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 overflow-y-auto max-h-3/4">
        <h2 className="text-xl font-bold mb-4">{resource.title}</h2>
        <p className="mb-4">{resource.description}</p>
        <p className="text-gray-500 mb-2">{resource.date}</p>

        <h3 className="text-lg font-semibold mt-4">Details:</h3>
        <p className="mb-4">{resource.details}</p>

        <h3 className="text-lg font-semibold mt-4">Tips:</h3>
        <ul className="list-disc list-inside mb-4">
          {resource.tips.map((tip, index) => (
            <li key={index} className="text-sm text-gray-700">{tip}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mt-4">Related Resources:</h3>
        <ul className="list-disc list-inside mb-4">
          {resource.relatedResources.map((related, index) => (
            <li key={index} className="text-sm text-blue-600 hover:underline">{related}</li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CareerDevelopmentDetail;
