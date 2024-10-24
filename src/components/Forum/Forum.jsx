"use client";

import React from "react";

const ForumCard = ({ author, title, date }) => (
  <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
    <p className="text-sm text-gray-600">by {author}</p>
    <h3 className="text-lg font-semibold mt-1">{title}</h3>
    <div className="flex justify-between items-center mt-2">
      <span className="text-sm text-gray-500">{date}</span>
      <button className="text-blue-600 hover:underline">View More</button>
    </div>
  </div>
);

const ForumComponent = () => {
  const forumPosts = [
    {
      author: "Determined-Poitras",
      title: "Create An LMS Website With React",
      date: "Sept 25, 2024",
    },
    {
      author: "Lavern Laboy",
      title: "Get Started With Stack Overflow",
      date: "Sept 25, 2024",
    },
    {
      author: "Determined-Poitras",
      title: "Computer Science - GraduGraduates",
      date: "Sept 25, 2024",
    },
    {
      author: "Determined-Poitras",
      title: "The Space Race",
      date: "Sept 25, 2024",
    },
    {
      author: "Determined-Poitras",
      title: "Computer Science - GraduGraduates",
      date: "Sept 25, 2024",
    },
    {
      author: "Determined-Poitras",
      title: "Computer Science - GraduGraduates",
      date: "Sept 25, 2024",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8  min-h-0 flex-grow overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">All Forums</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {forumPosts.map((post, index) => (
          <ForumCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default ForumComponent;
