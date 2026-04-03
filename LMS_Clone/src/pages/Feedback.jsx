import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MessageSquare, Plus } from "lucide-react";

const FEEDBACK_STORAGE_KEY = "feedbacks";

const Feedback = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heading, setHeading] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (stored) {
      try {
        setFeedbacks(JSON.parse(stored));
      } catch (e) {
        console.warn("Invalid feedback storage", e);
      }
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setHeading("");
    setCategory("");
    setDescription("");
  };

  const saveFeedbacks = (items) => {
    setFeedbacks(items);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(items));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!heading.trim() || !category || !description.trim()) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      heading: heading.trim(),
      category,
      description: description.trim(),
      createdAt: new Date().toISOString(),
    };

    saveFeedbacks([newFeedback, ...feedbacks]);
    closeModal();
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 pt-20">
      <Navbar />

      <div className="flex flex-wrap justify-around items-center gap-4 mb-10">
        <h1 className="text-3xl font-bold">Feedback</h1>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} />
          Create Feedback
        </button>
      </div>

      {feedbacks.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <div className="w-16 h-16 flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 mb-4">
            <MessageSquare className="text-neutral-400" size={28} />
          </div>

          <h2 className="text-lg font-medium text-neutral-300">No feedback yet</h2>
          <p className="text-sm text-neutral-500 mt-1">Share your thoughts and help us improve!</p>

          <button
            onClick={openModal}
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium"
          >
            Submit Your First Feedback
          </button>
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {feedbacks.map((item) => (
            <div key={item.id} className="border border-neutral-800 bg-neutral-900 rounded-xl p-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.heading}</h3>
                  <p className="text-sm text-neutral-400">{item.category}</p>
                </div>
                <span className="text-xs text-neutral-400">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-300">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg bg-neutral-900 rounded-xl border border-neutral-800 shadow-xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800">
              <h2 className="text-xl font-semibold">Create Feedback</h2>
              <button
                onClick={closeModal}
                className="text-neutral-400 hover:text-white text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Heading</label>
                <input
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  placeholder="Enter feedback heading..."
                  className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="Academics">Academics</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Faculties">Faculties</option>
                  <option value="Technical">Technical</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe your feedback..."
                  className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border border-neutral-700 text-sm text-neutral-300 bg-neutral-800 hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-sm text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
