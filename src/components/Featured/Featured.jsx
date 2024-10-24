// app/components/FeaturedProfile.js
// import { events, profiles } from "./data";

import { useSelector } from "react-redux";

const profiles = [
  {
    name: "Florencio Dorrance",
    title: "Project Manager",
    image: "/profile1.jpg",
  },
  {
    name: "Benny Spanbauer",
    title: " Sales Manager",
    image: "/profile2.jpg",
  },
  {
    name: "Jamel Eusebio",
    title: "React Dev",
    image: "/profile3.jpg",
  },
  {
    name: "Lavern Laboy",
    title: "Backend Dev",
    image: "/profile4.jpg",
  },
];

const events = [
  {
    id: 1,
    name: "Create An LMS Website With EduNet",
    date: "Sept 25, 2024",
  },
  {
    id: 2,
    name: "Create An LMS Website With EduNet",
    date: "Sept 25, 2024",
  },
  {
    id: 3,
    name: "Create An LMS Website With EduNet",
    date: "Sept 25, 2024",
  },
];

export default function FeaturedProfile() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  if (isLoggedIn) {
    return (
      <div className="w-3/12 bg-white p-5 shadow-md h-full">
        <div className="p-2">
          <h2 className="text-xl font-semibold border-b pb-2 text-center">
            Featured Profile
          </h2>
          <div className="mt-4">
            {profiles.map((profile) => (
              <div key={profile.name} className="flex items-center py-3">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-10 h-10 rounded-full object-cover mr-3 border-2"
                />
                <div>
                  <p className="text-sm">{profile.name}</p>
                  <p className="text-xs text-gray-500">{profile.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2">
          <h2 className="text-xl font-semibold border-b pb-2 text-center">
            Events
          </h2>
          <div className="mt-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full mr-3">
                    <img
                      src="/calendar-icon.svg"
                      alt="Event Icon"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <p className="text-sm">{event.name}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
                {/* <button className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                <span className="text-xl">+</span>
              </button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
