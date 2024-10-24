import React, { useState } from 'react';
import CareerDevelopmentDetail from '../CareerDevelopmentDetail/CareerDevelopmentDetail'; // Adjust the import path if necessary

const careerDevelopmentData = [
  {
    id: 1,
    title: "Best LearnPress WordPress Theme Collection For 2023",
    description: "Looking for an amazing & well-functional LearnPress WordPress theme? Check out these top picks for 2023.",
    date: "Jan 24, 2023",
    imageUrl: "/learn_wordpress.svg",
    details: "This collection includes themes designed specifically for LearnPress, a popular WordPress LMS plugin. Features include customizable layouts, responsive designs, and compatibility with popular plugins.",
    tips: [
      "Choose a theme that offers great support and updates.",
      "Consider customization options that fit your needs.",
      "Look for themes with good ratings and reviews.",
    ],
    relatedResources: [
      "Top WordPress Plugins for 2023",
      "How to Optimize Your WordPress Site",
      "Choosing the Right LMS for Your Needs",
    ],
  },
  {
    id: 2,
    title: "How to Build a Professional Portfolio",
    description: "Learn the essential tips for creating a professional portfolio that stands out.",
    date: "Feb 15, 2023",
    imageUrl: "/professional_portfolio.svg",
    details: "A professional portfolio is crucial for showcasing your work and skills. This guide covers the essentials of crafting an impactful portfolio, including layout, content, and presentation.",
    tips: [
      "Use high-quality images to showcase your work.",
      "Make it easy for viewers to contact you.",
      "Include a variety of work samples that demonstrate your range.",
    ],
    relatedResources: [
      "Best Portfolio Examples for Inspiration",
      "Essential Tools for Building Your Portfolio",
      "How to Present Your Work Effectively",
    ],
  },
  {
    id: 3,
    title: "Mastering Job Interviews: Tips for Success",
    description: "Prepare yourself for the most challenging job interviews with these expert tips.",
    date: "March 3, 2023",
    imageUrl: "/job_interview_tips.svg",
    details: "This resource offers a comprehensive guide to navigating job interviews successfully, from preparation to follow-up. Learn about common interview questions, body language, and the importance of research.",
    tips: [
      "Research the company and its culture.",
      "Prepare your questions to ask the interviewer.",
      "Practice your answers to common interview questions.",
      "Follow up with a thank you note after the interview.",
    ],
    relatedResources: [
      "Common Interview Questions and How to Answer Them",
      "The STAR Method for Answering Behavioral Questions",
      "How to Handle Interview Anxiety",
    ],
  },
  {
    id: 4,
    title: "How to learn HTML",
    description: "Prepare yourself for the most exciting tips on starting with the basics of HTML.",
    date: "Dec 30, 2023",
    imageUrl: "/learn_html.svg",
    details: "HTML is the foundation of web development. This guide will help you understand the essential elements of HTML, including tags, attributes, and best practices for writing clean code.",
    tips: [
      "Start with the basic structure of an HTML document.",
      "Use semantic HTML for better accessibility.",
      "Experiment with different HTML elements to understand their purpose.",
    ],
    relatedResources: [
      "HTML Cheat Sheet",
      "Free Online HTML Courses",
      "Advanced HTML Techniques for Developers",
    ],
  },
];

const CareerDevelopment = () => {
  const placeholderImage = "path/to/placeholder/image"; // Replace with actual placeholder image
  const [selectedResource, setSelectedResource] = useState(null);

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  const handleCloseDetail = () => {
    setSelectedResource(null); // Clear the selected resource to close the detail view
  };

  return (
    <div className="h-full w-full p-6 bg-white">
      <div className="flex flex-col space-y-4">
        {careerDevelopmentData.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer"
            onClick={() => handleResourceClick(resource)} // Handle resource click
          >
            <img
              src={resource.imageUrl || placeholderImage}
              className="w-24 h-24 object-cover rounded-lg"
              onError={(e) => (e.target.src = placeholderImage)}
              alt={resource.title} // Add alt text for accessibility
            />
            <div className="flex-grow">
              <h3 className="text-lg font-bold">{resource.title}</h3>
              <p className="text-sm text-gray-600">{resource.description}</p>
              <p className="text-sm text-gray-500">{resource.date}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedResource && ( // Render ResourceDetail when a resource is selected
        <CareerDevelopmentDetail
          resource={selectedResource}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default CareerDevelopment;