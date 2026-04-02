import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";

const Weekly_feedback = () => {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  const subjects = user?.subjects || [];

  const [ratings, setRatings] = useState(() =>
    subjects.reduce((acc, subject) => {
      acc[subject] = 0;
      return acc;
    }, {}),
  );

  const [comments, setComments] = useState(() =>
    subjects.reduce((acc, subject) => {
      acc[subject] = "";
      return acc;
    }, {}),
  );

  const isEmpty = useMemo(() => subjects.length === 0, [subjects]);

  const handleRating = (subject, value) => {
    setRatings((prev) => ({ ...prev, [subject]: value }));
  };

  const handleComment = (subject, value) => {
    setComments((prev) => ({ ...prev, [subject]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = subjects.map((subject) => ({
      subject,
      rating: ratings[subject],
      comment: comments[subject],
    }));

    console.log("Weekly Feedback Submitted", payload);
    alert("Weekly feedback submitted successfully!");
  };

  return (
    <div className="relative min-h-screen bg-neutral-900 text-white">
      <Navbar />

      <main className="pt-24 pb-10 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Weekly Subject Feedback</h1>
          <p className="text-neutral-400 mt-1">Share your thoughts on this week's subjects.</p>
        </div>

        {isEmpty ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-10 text-center">
            <div className="text-5xl text-neutral-500 mb-4">📘</div>
            <h2 className="text-xl font-semibold">All Caught Up!</h2>
            <p className="text-neutral-400 mt-2">No subjects available for feedback at this time.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {subjects.map((subject) => (
              <div
                key={subject}
                className="rounded-2xl border border-neutral-800 bg-neutral-800 p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg">{subject}</h3>
                    <p className="text-xs text-neutral-400">Leave your weekly feedback below.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleRating(subject, val)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                          ratings[subject] >= val
                            ? "bg-emerald-500 text-black"
                            : "bg-neutral-700 text-neutral-300"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={comments[subject]}
                  onChange={(e) => handleComment(subject, e.target.value)}
                  className="mt-3 w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your feedback for this subject"
                  rows={3}
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full md:w-auto rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default Weekly_feedback;
