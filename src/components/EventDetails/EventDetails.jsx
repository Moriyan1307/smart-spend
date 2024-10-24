import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

const Article = ({ event }) => {
  if (!event) return null;

  return (
    <Card style={{ maxWidth: 800, margin: "auto", padding: "20px", borderRadius: "16px", boxShadow: "0px 8px 16px rgba(0,0,0,0.1)" }}>
      {/* Image Section */}
      <img
        src={`path/to/images/${event.type}.png`} // Dynamically set image based on event type
        alt={event.title}
        style={{ width: "100%", height: "auto", borderRadius: "16px" }}
      />

      {/* Title Section */}
      <CardContent>
        <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
          {event.title}
        </Typography>

        {/* Author and Date Section */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "10px", color: "#777" }}>
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
        <Typography variant="body1" color="textSecondary" component="p" style={{ marginTop: "20px" }}>
          {event.description}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p" style={{ marginTop: "10px" }}>
          {event.additionalInfo || "No additional information available for this event."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Article;