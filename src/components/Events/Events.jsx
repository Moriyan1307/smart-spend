import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";

// Sample events data
const events = [
  {
    id: 1,
    title: "React Workshop",
    type: "workshop",
    date: new Date(2024, 9, 5),
    time: "10:00 AM - 2:00 PM",
    description: "Learn the basics of React",
    speaker: "John Doe",
    additionalInfo: "Bring your laptop and install Node.js beforehand.",
    image: "/react_workshop.svg", // Image for React Workshop
  },
  {
    id: 2,
    title: "AI Seminar",
    type: "seminar",
    date: new Date(2024, 9, 12),
    time: "3:00 PM - 5:00 PM",
    description: "Exploring the future of AI",
    speaker: "Jane Smith",
    additionalInfo: "Discuss how AI will shape the next decade.",
    image: "/ai_seminar.svg", // Image for AI Seminar
  },
  {
    id: 3,
    title: "UX Design Workshop",
    type: "workshop",
    date: new Date(2024, 9, 18),
    time: "9:00 AM - 12:00 PM",
    description: "Hands-on UX design techniques",
    speaker: "Emily Johnson",
    additionalInfo: "Workshop focuses on user-centered design practices.",
    image: "/ux_workshop.svg", // Image for UX Design Workshop
  },
  {
    id: 4,
    title: "Cybersecurity Seminar",
    type: "seminar",
    date: new Date(2024, 9, 25),
    time: "2:00 PM - 4:00 PM",
    description: "Latest trends in cybersecurity",
    speaker: "Michael Lee",
    additionalInfo: "Learn about emerging cybersecurity threats and defenses.",
    image: "/cybersecurity_seminar.svg", // Image for Cybersecurity Seminar
  },
];

// Helper function to generate dates for the calendar
const generateDates = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const dates = [];

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    dates.push(null);
  }

  // Add all days of the month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    dates.push(new Date(year, month, i));
  }

  return dates;
};

const EventDetails = ({ event }) => {
  if (!event) return null;

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
      }}
    >
      {/* Image Section */}
      <img
        src={event.image} // Dynamically set image based on event type
        alt={event.title}
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "400px",
          borderRadius: "16px",
        }}
      />

      {/* Title Section */}
      <CardContent>
        <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
          {event.title}
        </Typography>

        {/* Author and Date Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            color: "#777",
          }}
        >
          <PersonIcon style={{ marginRight: "5px" }} />
          <Typography variant="body2" component="p">
            {event.speaker || "Unknown Speaker"}
          </Typography>
          <CalendarTodayIcon style={{ margin: "0 5px" }} />
          <Typography variant="body2" component="p">
            {event.date.toLocaleDateString()}
          </Typography>
        </div>

        {/* Event Description */}
        <Typography
          variant="body1"
          color="textSecondary"
          component="p"
          style={{ marginTop: "20px" }}
        >
          {event.description}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          component="p"
          style={{ marginTop: "10px" }}
        >
          {event.additionalInfo ||
            "No additional information available for this event."}
        </Typography>
      </CardContent>
    </Card>
  );
};

// CalendarComponent
export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dates = generateDates(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const getEventsForDate = (date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null); // Close event details and go back to calendar view
  };

  if (selectedEvent) {
    return (
      <div className=" container m-auto p-4">
        {/* Pass the selected event to the Article component */}
        <EventDetails event={selectedEvent} />

        <div className="mt-4 ml-auto">
          <button
            onClick={handleCloseDetails}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Back to All Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Events Calendar</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="px-2 py-1 border rounded"
          >
            Prev
          </button>
          <span className="text-lg font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() => navigateMonth(1)}
            className="px-2 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <div
            key={index}
            className="border rounded-lg p-2 h-20 overflow-y-auto"
          >
            {date && (
              <>
                <div className="text-right text-sm text-gray-500">
                  {date.getDate()}
                </div>
                {getEventsForDate(date).map((event) => (
                  <div
                    key={event.id}
                    className={`w-full text-left mb-1 p-1 text-xs cursor-pointer ${
                      event.type === "workshop"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                    onClick={() => handleEventClick(event)}
                  >
                    <strong>{event.title}</strong>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-100 mr-2"></div>
          <span>Workshop</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 mr-2"></div>
          <span>Seminar</span>
        </div>
      </div>
    </div>
  );
}
