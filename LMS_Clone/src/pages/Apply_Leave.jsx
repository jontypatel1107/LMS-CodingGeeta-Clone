import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";

function Apply_Leave() {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveTime, setLeaveTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [remarks, setRemarks] = useState("");

  const [requests, setRequests] = useState(() => user?.leaveRequests || []);

  const totalApplications = requests.length;
  const pendingApplications = requests.filter((r) => r.status === "Pending").length;
  const approvedApplications = requests.filter((r) => r.status === "Approved").length;
  const rejectedApplications = requests.filter((r) => r.status === "Rejected").length;

  const canSubmit = category && fromDate && toDate && leaveTime && returnTime;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newRequest = {
      id: Date.now(),
      category,
      fromDate,
      toDate,
      leaveTime,
      returnTime,
      remarks,
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };

    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);

    if (user) {
      const updatedUser = { ...user, leaveRequests: updatedRequests };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    setCategory("");
    setFromDate("");
    setToDate("");
    setLeaveTime("");
    setReturnTime("");
    setRemarks("");

    alert("Leave request submitted successfully and is pending review.");
  };

  const sortedRequests = useMemo(
    () => requests.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)),
    [requests],
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <Navbar />
        <div className="pt-20 px-4 max-w-7xl mx-auto">Please login to apply for leave.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Apply for Leave</h1>
        <p className="text-neutral-400 mb-6">Submit your leave application and track your requests</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-neutral-900 rounded-lg p-6 flex flex-col items-center">
            <span className="text-2xl font-bold">{totalApplications}</span>
            <span className="text-neutral-400 mt-1">Total Applications</span>
          </div>
          <div className="bg-neutral-900 rounded-lg p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-400">{pendingApplications}</span>
            <span className="text-neutral-400 mt-1">Pending Review</span>
          </div>
          <div className="bg-neutral-900 rounded-lg p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-green-400">{approvedApplications}</span>
            <span className="text-neutral-400 mt-1">Approved</span>
          </div>
          <div className="bg-neutral-900 rounded-lg p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-red-400">{rejectedApplications}</span>
            <span className="text-neutral-400 mt-1">Rejected</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <span className="bg-neutral-800 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-xl font-bold">+</span>
              <div>
                <div className="font-semibold">New Leave Application</div>
                <div className="text-neutral-400 text-sm">Fill out the form to submit your leave request</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Leave Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-neutral-800 rounded px-3 py-2 text-white focus:outline-none"
                >
                  <option value="">Select category</option>
                  <option value="sick">Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                  <option value="emergency">Emergency Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full bg-neutral-800 rounded px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full bg-neutral-800 rounded px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Leave Time</label>
                  <input
                    type="time"
                    value={leaveTime}
                    onChange={(e) => setLeaveTime(e.target.value)}
                    className="w-full bg-neutral-800 rounded px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Return Time</label>
                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-full bg-neutral-800 rounded px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Additional Remarks (Optional)</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full bg-neutral-800 rounded px-3 py-2 text-white focus:outline-none"
                  rows="2"
                  placeholder="Any additional information for your mentor or admin"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded flex items-center justify-center gap-2"
                disabled={!canSubmit}
              >
                <span className="material-icons text-base">send</span>
                Submit Leave Application
              </button>
            </form>
          </div>

          <div className="bg-neutral-900 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <span className="bg-neutral-800 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-xl font-bold">
                <IoPersonCircleSharp />
              </span>
              <div>
                <div className="font-semibold">My Leave Requests</div>
                <div className="text-neutral-400 text-sm">Track the status of your applications</div>
              </div>
            </div>

            {sortedRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 mt-8">
                <IoDocumentTextSharp className="text-5xl text-neutral-700 mb-2" />
                <div className="text-neutral-400 font-medium">No leave requests yet</div>
                <div className="text-neutral-600 text-sm">Your submitted applications will appear here</div>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedRequests.map((request) => (
                  <div key={request.id} className="rounded-lg border border-neutral-800 bg-neutral-800 p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-white">{request.category}</div>
                        <div className="text-sm text-neutral-400">
                          {request.fromDate} to {request.toDate}
                        </div>
                        <div className="text-xs text-neutral-400">{request.leaveTime} - {request.returnTime}</div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          request.status === "Approved"
                            ? "bg-green-500/20 text-green-300"
                            : request.status === "Rejected"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                    {request.remarks && (
                      <p className="mt-2 text-sm text-neutral-300">Remark: {request.remarks}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apply_Leave;