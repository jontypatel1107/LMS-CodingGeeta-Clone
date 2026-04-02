import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";

const EventSection = ({ title, items }) => (
  <div className="rounded-xl border border-neutral-800 bg-neutral-900 mb-6">
    <div className="p-4 border-b border-neutral-800">
      <h2 className="text-white font-semibold">{title}</h2>
    </div>
    <div className="p-4">
      {items.length === 0 ? (
        <p className="text-neutral-400 text-sm">No {title.toLowerCase()} events.</p>
      ) : (
        <div className="space-y-3">
          {items.map((event, idx) => {
            const eventName = typeof event === 'string' ? event : event.name;
            const eventDate = typeof event === 'string' ? null : event.date;
            
            return (
              <div
                key={idx}
                className="border border-neutral-700 rounded-lg p-4 bg-neutral-800 hover:bg-neutral-700 transition"
              >
                <p className="text-white font-medium">{eventName}</p>
                {eventDate && (
                  <p className="text-neutral-400 text-sm mt-1">{eventDate}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

export default function Events() {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white pt-20">
        <Navbar />
        <div className="mx-auto pb-10 max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl">No user found. Please log in.</p>
          <Link to="/login" className="text-blue-500 underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const events = Array.isArray(user.events) ? user.events : [];

  // Categorize events
  const ongoingEvents = [];
  const upcomingEvents = [];
  const pastEvents = [
    { name: "Diwali Vacation", date: "18/10/2025 — 26/10/2025" }
  ];

  // Simple categorization - in a real app, you'd use dates
  events.forEach((event) => {
    const eventObj = typeof event === 'string' 
      ? { name: event, date: null }
      : event;
    
    if (eventObj.name.includes("Vacation") || eventObj.name.includes("Break")) {
      pastEvents.push(eventObj);
    } else if (eventObj.name.includes("upcoming")) {
      upcomingEvents.push(eventObj);
    } else {
      ongoingEvents.push(eventObj);
    }
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-20">
      <Navbar />
      <div className="mx-auto pb-10 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Events</h1>
            <p className="text-neutral-400 mt-1">View all upcoming and past events.</p>
          </div>
          <Link
            className="text-sm text-white hover:text-blue-300 underline"
            to="/student"
          >
            <ArrowLeft className="w-3 h-6 inline mr-2" />
            Back to dashboard
          </Link>
        </div>

        <EventSection title="Ongoing" items={ongoingEvents} />
        <EventSection title="Upcoming" items={upcomingEvents} />
        <EventSection title="Past" items={pastEvents} />
      </div>
    </div>
  );
}
