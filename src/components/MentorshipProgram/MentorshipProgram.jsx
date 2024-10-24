import React from 'react';
import PersonIcon from "@mui/icons-material/Person";

const mentorshipData = [
  {
    id: 1,
    title: "Learn React with best mentor from industry",
    mentor: "Usha Sai",
    imageUrl: "/react_workshop.svg", // Replace with actual image path
  },
  {
    id: 2,
    title: "Learn React with best mentor from industry",
    mentor: "Usha Sai",
    imageUrl: "/react_workshop.svg", // Replace with actual image path
  },
  {
    id: 3,
    title: "Learn React with best mentor from industry",
    mentor: "Usha Sai",
    imageUrl: "/react_workshop.svg", // Replace with actual image path
  },
  {
      id: 4,
      title: "Learn React with best mentor from industry",
      mentor: "Usha Sai",
      imageUrl: "/react_workshop.svg", // Replace with actual image path
  },
];

const MentorshipProgram = ({ onEnroll }) => {
  const placeholderImage = "path/to/placeholder/image"; // Replace with actual placeholder image

  return (
    <div className="h-full w-full p-6 bg-white">
      <div className="flex flex-col space-y-4">
        {mentorshipData.map((program) => (
          <div key={program.id} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <img
              src={program.imageUrl || placeholderImage}
              className="w-24 h-24 object-cover rounded-lg"
              onError={(e) => (e.target.src = placeholderImage)}
            />
            <div className="flex-grow">
              <h3 className="text-lg font-bold">{program.title}</h3>
              <p className="text-sm text-gray-500 flex items-center">
                <PersonIcon sx={{ fontSize: 28 }} />
                {program.mentor}
              </p>
            </div>
            <button
            onClick={onEnroll}
            className="bg-black text-white px-4 py-2 rounded-lg">
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorshipProgram;