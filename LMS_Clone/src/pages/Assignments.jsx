import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Assignments() {
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

  const assignments = Array.isArray(user.assignments) ? user.assignments : [];

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-20">
      <Navbar />
      <div className="mx-auto pb-10 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-semibold">Assignments</h1>
          <p className="text-neutral-400 mb-6">Search, filter and sort your assignments.</p>
          </div>
          <Link
            className="text-sm text-white hover:text-blue-300 underline"
            to="/student"
          >
            <ArrowLeft className="w-3 h-6 inline mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {assignments.length === 0 ? (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <p className="text-neutral-400">No assignments available.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 space-y-2">
            {assignments.map((item, idx) => (
              <div key={idx} className="border-b border-neutral-800 pb-2">
                <p className="text-white">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
