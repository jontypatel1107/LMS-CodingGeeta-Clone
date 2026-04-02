import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import StudentDashboard from "./pages/studentDashboard";
import StudentCalendar from "./pages/StudentCalendar";
import Sem_attendance from "./pages/Sem_attendance";
import Weekly_feedback from "./pages/Weekly_feedback";
import Apply_Leave from "./pages/Apply_Leave";
import Attendance from "./pages/Attendance";
import Feedback from "./pages/Feedback";
import Profile from "./pages/StudentProfile";
import Assignments from "./pages/Assignments";
import Events from "./pages/Events";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/student/calendar" element={<StudentCalendar />} />
      <Route path="/student/attendance" element={<Attendance />} />
      <Route path="/student/semester-attendance" element={<Sem_attendance />} />
      <Route path="/student/weekly-feedback" element={<Weekly_feedback />} />
      <Route path="/student/feedback" element={<Feedback />} />
      <Route path="/student/apply-leave" element={<Apply_Leave />} />
      <Route path="/student/profile" element={<Profile />} />
      <Route path="/student/assignments" element={<Assignments />} />
      <Route path="/student/events" element={<Events />} />
    </Routes>
  );
}

export default App;
