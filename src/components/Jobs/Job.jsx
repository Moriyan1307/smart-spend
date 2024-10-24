import React, { useState } from "react";
import JobCard from "./JobCard";
import Navigation from "./JobsNavigation";
import AddJobForm from "./AddJobForm";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("fullTime");

  const [jobListings, setJobListings] = useState([
    {
      company: "Google Inc.",
      title: "Fresher UI/UX Designer (3 Year Exp )",
      location: "Dallas, Texas",
      type: "Full Time",
      salary: "$120,000 - $125,000",
    },
    {
      company: "Facebook Inc.",
      title: "Fresher UI/UX Designer (3 Year Exp )",
      location: "Dallas, Texas",
      type: "Full Time",
      salary: "$120,000 - $125,000",
    },
    {
      company: "LinkedIn Inc.",
      title: "Fresher UI/UX Designer (3 Year Exp )",
      location: "Dallas, Texas",
      type: "Full Time",
      salary: "$120,000 - $125,000",
    },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddJob = () => {
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
  };

  const handleRegisterJob = (newJob) => {
    setJobListings((prevJobs) => [...prevJobs, newJob]);
    setIsFormVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
          onClick={handleAddJob}
        >
          Add Job
        </button>
      </div>

      {/* Show form if Add Job button is clicked */}
      {isFormVisible ? (
        <AddJobForm
          onRegisterJob={handleRegisterJob}
          onCancel={handleCancelForm}
        />
      ) : (
        /* Job Listings */
        <div className="space-y-4 mt-8">
          {jobListings.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
