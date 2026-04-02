import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Sem_attendance() {
    const semesters = [
        {
            id: 1,
            name: "Semester 1",
            start: "31/07/2025",
            end: "28/01/2026",
            total: 270,
            present: 262,
            absent: 34,
            leave: 0,
            internLeave: 0,
        },
        {
            id: 2,
            name: "Semester 2",
            start: "29/01/2026",
            end: "30/06/2026",
            total: 0,
            present: 0,
            absent: 0,
            leave: 0,
            internLeave: 0,
        },
    ];

    const [active, setActive] = useState(semesters[0]);

    const attendancePercent =
        active.total > 0
            ? Math.round((active.present / active.total) * 100)
            : 0;

    const durationDays = 181; // static (you can calculate dynamically)

    return (
        <div className="bg-black text-white min-h-screen p-6 pt-20">
            <Navbar />

            <h1 className="text-2xl font-semibold">Semester Attendance</h1>
            <p className="text-neutral-400 text-sm mb-6">
                View your attendance statistics by semester
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* LEFT PANEL */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                    <h2 className="mb-4 font-medium">Semesters</h2>

                    <div className="space-y-3">
                        {semesters.map((sem) => (
                            <div
                                key={sem.id}
                                onClick={() => setActive(sem)}
                                className={`p-3 rounded-lg cursor-pointer border ${active.id === sem.id
                                    ? "bg-blue-900 border-blue-500"
                                    : "bg-black border-neutral-800 hover:border-neutral-600"
                                    }`}
                            >
                                <div className="font-medium">{sem.name}</div>
                                <div className="text-xs text-neutral-400">
                                    {sem.start} - {sem.end}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="lg:col-span-3 space-y-6">
                    {/* MAIN CARD */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                        {/* HEADER */}
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="font-semibold">{active.name}</h2>
                                <p className="text-xs text-neutral-400">
                                    {active.start} - {active.end}
                                </p>
                            </div>

                            <div className="text-right">
                                <div className="text-3xl font-bold">
                                    {attendancePercent}%
                                </div>
                                <div className="text-xs text-neutral-400">
                                    Attendance
                                </div>
                            </div>
                        </div>

                        {/* PROGRESS BAR */}
                        <div className="mb-6">
                            <div className="flex justify-between text-sm mb-1">
                                <span>Overall Attendance</span>
                                <span>{attendancePercent}%</span>
                            </div>

                            <div className="w-full bg-neutral-800 h-2 rounded">
                                <div
                                    className="bg-green-500 h-2 rounded"
                                    style={{ width: `${attendancePercent}%` }}
                                />
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <StatCard label="Total Marked" value={active.total} />
                            <StatCard label="Present Count" value={active.present} green />
                            <StatCard label="Absent Count" value={active.absent} red />
                            <StatCard label="Attendance %" value={`${attendancePercent}%`} blue />
                        </div>

                        {/* LOWER GRID */}
                        <div className="grid md:grid-cols-2 gap-6 border-t border-neutral-800 pt-4">
                            {/* STATUS */}
                            <div>
                                <h3 className="text-sm text-neutral-400 mb-3">
                                    Status Breakdown
                                </h3>

                                <BreakItem label="Present Count" value={active.present} green />
                                <BreakItem label="Absent Count" value={active.absent} red />
                                <BreakItem label="Leave Days" value={active.leave} yellow />
                                <BreakItem
                                    label="Intern Leave Days"
                                    value={active.internLeave}
                                    purple
                                />
                            </div>

                            {/* PERIOD */}
                            <div>
                                <h3 className="text-sm text-neutral-400 mb-3">
                                    Period Information
                                </h3>

                                <InfoItem label="Start Date" value={active.start} />
                                <InfoItem label="End Date" value={active.end} />
                                <InfoItem label="Duration" value={`${durationDays} days`} />
                            </div>
                        </div>
                    </div>

                    {/* STATUS CARD */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                        <h3 className="mb-2 font-medium">Attendance Status</h3>
                        <p className="text-green-400 text-sm">
                            ✓ Your attendance is good. Keep up the consistent attendance!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* COMPONENTS */

function StatCard({ label, value, green, red, blue }) {
    return (
        <div className="bg-black border border-neutral-800 rounded-lg p-4">
            <div className="text-xs text-neutral-400">{label}</div>
            <div
                className={`text-xl font-semibold ${green
                    ? "text-green-400"
                    : red
                        ? "text-red-400"
                        : blue
                            ? "text-blue-400"
                            : ""
                    }`}
            >
                {value}
            </div>
        </div>
    );
}

function BreakItem({ label, value, green, red, yellow, purple }) {
    const color =
        green
            ? "bg-green-500"
            : red
                ? "bg-red-500"
                : yellow
                    ? "bg-yellow-500"
                    : purple
                        ? "bg-purple-500"
                        : "bg-neutral-500";

    return (
        <div className="flex justify-between mb-2 text-sm">
            <span>{label}</span>
            <span className={`px-2 py-0.5 rounded text-xs ${color}`}>
                {value}
            </span>
        </div>
    );
}

function InfoItem({ label, value }) {
    return (
        <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral-400">{label}</span>
            <span>{value}</span>
        </div>
    );
}
