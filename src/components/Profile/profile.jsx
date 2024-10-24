import Link from "next/link";
import React from "react";

const ProfileField = ({ label, value }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-1">{label}</h3>
    <p className="text-xl">{value}</p>
  </div>
);

const Profile = () => {
  const userInfo = {
    firstName: "Usha",
    lastName: "Sai",
    email: "usha.sai@email.com",
    role: "Student",
    phoneNumber: "123 456 7890",
    major: "Computer Science",
    interests: "Front- end Dev",
    graduationYear: "2025",
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        <ProfileField label="First Name" value={userInfo.firstName} />
        <ProfileField label="Last Name" value={userInfo.lastName} />
        <ProfileField label="Email" value={userInfo.email} />
        <ProfileField label="Role" value={userInfo.role} />
        <ProfileField label="Phone Number" value={userInfo.phoneNumber} />
        <ProfileField label="Major" value={userInfo.major} />
        <ProfileField label="Interests" value={userInfo.interests} />
        <ProfileField label="Graduation Year" value={userInfo.graduationYear} />
      </div>

      <div className="mt-8">
        <Link
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-lg"
          href="/settings"
        >
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Profile;
