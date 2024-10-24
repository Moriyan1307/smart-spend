"use client";

import React, { useState } from "react";
import CareerDevelopment from "../../components/CareerDevelopment/CareerDevelopment";
import MentorshipProgram from "../../components/MentorshipProgram/MentorshipProgram";
import MentorshipForm from "../../components/MentorshipApplicationForm/MentorshipApplicationForm"; // Assuming you have a separate component for the form
import ResourcesTopNavigation from "../../components/ResourcesNavigation/ResourcesNavigation";


const Resources = () => {
  const [activeTab, setActiveTab] = useState("career"); // 'career' or 'mentorship'
  const [showMentorshipForm, setShowMentorshipForm] = useState(false);

   const handleEnrollClick = () => {
     setShowMentorshipForm(true);
   };

   const handleBackToMentorshipProgram = () => {
     setShowMentorshipForm(false);
   };

  return (
    <div className="h-full flex flex-col">
      {/* Top Navigation */}
      <ResourcesTopNavigation activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

      {/* Content Area */}
      <div className="flex flex-grow mt-4">
        {activeTab === "career" ? (
          <CareerDevelopment />
        ) : showMentorshipForm ? (
          <MentorshipForm onBack={handleBackToMentorshipProgram} />
        ) : (
          <MentorshipProgram onEnroll={handleEnrollClick} />
        )}
      </div>
    </div>
  );
};

export default Resources;