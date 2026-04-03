import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { MessageSquare, Plus, Edit2, Trash2, Check, X } from "lucide-react";

const FEEDBACK_STORAGE_KEY = "feedbacks";

const Feedback = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heading, setHeading] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const feedbacksRef = useRef(null);

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

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openModal = (feedback = null) => {
    setIsModalOpen(true);
    setValidationErrors({});
    if (feedback) {
      setEditingId(feedback.id);
      setHeading(feedback.heading);
      setCategory(feedback.category);
      setDescription(feedback.description);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setHeading("");
    setCategory("");
    setDescription("");
    setValidationErrors({});
  };

  const saveFeedbacks = (items) => {
    setFeedbacks(items);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(items));
  };

  const validateForm = () => {
    const errors = {};
    if (!heading.trim()) errors.heading = "Heading is required";
    if (!category) errors.category = "Please select a category";
    if (!description.trim()) errors.description = "Description is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the errors before submitting", "error");
      return;
    }

    const feedbackData = {
      id: editingId || Date.now(),
      heading: heading.trim(),
      category,
      description: description.trim(),
      createdAt: editingId
        ? feedbacks.find(f => f.id === editingId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
    };

    let updatedFeedbacks;
    if (editingId) {
      updatedFeedbacks = feedbacks.map(f => f.id === editingId ? feedbackData : f);
      showToast("Feedback updated successfully!");
    } else {
      updatedFeedbacks = [feedbackData, ...feedbacks];
      showToast("Feedback submitted successfully!");
      // Auto-scroll to top after adding new feedback
      setTimeout(() => {
        feedbacksRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }

    saveFeedbacks(updatedFeedbacks);
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      const updatedFeedbacks = feedbacks.filter(f => f.id !== id);
      saveFeedbacks(updatedFeedbacks);
      showToast("Feedback deleted successfully!");
    }
  };

  const handleEdit = (feedback) => {
    openModal(feedback);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 pt-20">
      <Navbar />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white text-sm font-medium ${
          toast.type === "error" ? "bg-red-600" : "bg-green-600"
        }`}>
          {toast.message}
        </div>
      )}

      <div className="flex flex-wrap justify-around items-center gap-4 mb-10">
        <h1 className="text-3xl font-bold">Feedback</h1>
        <button
          onClick={() => openModal()}
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
            onClick={() => openModal()}
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium"
          >
            Submit Your First Feedback
          </button>
        </div>
      ) : (
        <div ref={feedbacksRef} className="space-y-4 mt-4">
          {feedbacks.map((item) => (
            <div key={item.id} className="border border-neutral-800 bg-neutral-900 rounded-xl p-4">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{item.heading}</h3>
                  <p className="text-sm text-neutral-400">{item.category}</p>
                  <p className="mt-2 text-sm text-neutral-300">{item.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-neutral-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1 text-neutral-400 hover:text-blue-400 transition-colors"
                      title="Edit feedback"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 text-neutral-400 hover:text-red-400 transition-colors"
                      title="Delete feedback"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg bg-neutral-900 rounded-xl border border-neutral-800 shadow-xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Feedback" : "Create Feedback"}
              </h2>
              <button
                onClick={closeModal}
                className="text-neutral-400 hover:text-white text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Heading <span className="text-red-400">*</span>
                </label>
                <input
                  value={heading}
                  onChange={(e) => {
                    setHeading(e.target.value);
                    if (validationErrors.heading) {
                      setValidationErrors(prev => ({ ...prev, heading: "" }));
                    }
                  }}
                  placeholder="Enter feedback heading..."
                  className={`w-full rounded-md border px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.heading ? "border-red-500 bg-red-900/20" : "border-neutral-700 bg-neutral-800"
                  }`}
                />
                {validationErrors.heading && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.heading}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (validationErrors.category) {
                      setValidationErrors(prev => ({ ...prev, category: "" }));
                    }
                  }}
                  className={`w-full rounded-md border px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.category ? "border-red-500 bg-red-900/20" : "border-neutral-700 bg-neutral-800"
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="Academics">Academics</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Faculties">Faculties</option>
                  <option value="Technical">Technical</option>
                  <option value="Others">Others</option>
                </select>
                {validationErrors.category && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (validationErrors.description) {
                      setValidationErrors(prev => ({ ...prev, description: "" }));
                    }
                  }}
                  rows={4}
                  placeholder="Describe your feedback..."
                  className={`w-full rounded-md border px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.description ? "border-red-500 bg-red-900/20" : "border-neutral-700 bg-neutral-800"
                  }`}
                />
                {validationErrors.description && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.description}</p>
                )}
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
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-sm text-white flex items-center gap-2"
                >
                  {editingId ? <Check size={16} /> : <Plus size={16} />}
                  {editingId ? "Update" : "Submit"}
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
