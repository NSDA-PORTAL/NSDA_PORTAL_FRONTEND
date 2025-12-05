import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IconCheck,
  IconClock,
  IconUser,
  IconUsers,
  IconCalendar,
} from "@tabler/icons-react";

// API Base URL
const API_BASE_URL = "http://localhost:5000/api/attendance";

const AttendancePage = () => {
  const [todayMarked, setTodayMarked] = useState(false);
  const [history, setHistory] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [allAttendance, setAllAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const token = localStorage.getItem("authToken");

  // FIXED: axios instance now has baseURL so token is sent correctly
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const userRole = localStorage.getItem("role");
        setIsAdmin(userRole === "admin" || userRole === "superadmin");

        // User history
        const historyRes = await axiosInstance.get("/history");
        setHistory(historyRes.data.data);

        // Weekly summary
        const summaryRes = await axiosInstance.get("/summary/weekly");
        setWeeklySummary(summaryRes.data.summary);

        // Admin fetch all
        if (userRole === "admin" || userRole === "superadmin") {
          const allRes = await axiosInstance.get("/admin/all");
          setAllAttendance(allRes.data.data);
        }

        // Detect if today's attendance is already marked
        const today = new Date().toISOString().split("T")[0];
        setTodayMarked(historyRes.data.data.some((r) => r.date === today));

      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mark attendance
  const handleMarkAttendance = async () => {
    try {
      const res = await axiosInstance.post("/mark");

      setTodayMarked(true);
      setHistory((prev) => [res.data.data, ...prev]);

      alert("Attendance marked successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error marking attendance");
    }
  };

  if (loading) {
    return (
      <div className="text-center pt-24 text-gray-500 dark:text-gray-400">
        Loading attendance data...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 w-full">
      <h1 className="text-2xl font-semibold text-gray-900">Attendance</h1>

      {/* Mark Attendance */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Mark Today’s Attendance</h2>
          <p className="text-sm text-gray-500">
            Ensure you mark attendance every day.
          </p>
        </div>

        <button
          onClick={handleMarkAttendance}
          disabled={todayMarked}
          className={`px-4 py-2 rounded-lg font-semibold ${
            todayMarked
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {todayMarked ? "Already Marked" : "Mark Attendance"}
        </button>
      </div>

      {/* Weekly Summary */}
      {weeklySummary && (
        <div className="bg-white rounded-xl shadow p-6 grid grid-cols-4 text-center">
          <div>
            <IconClock size={24} className="mx-auto mb-1 text-blue-600" />
            <p className="text-sm text-gray-500">Total Days</p>
            <p className="font-bold text-gray-900">{weeklySummary.total}</p>
          </div>

          <div>
            <IconCheck size={24} className="mx-auto mb-1 text-green-600" />
            <p className="text-sm text-gray-500">Present</p>
            <p className="font-bold text-gray-900">
              {weeklySummary.present}
            </p>
          </div>

          <div>
            <IconUser size={24} className="mx-auto mb-1 text-red-600" />
            <p className="text-sm text-gray-500">Absent</p>
            <p className="font-bold text-gray-900">{weeklySummary.absent}</p>
          </div>

          <div>
            <IconClock size={24} className="mx-auto mb-1 text-yellow-600" />
            <p className="text-sm text-gray-500">Late</p>
            <p className="font-bold text-gray-900">{weeklySummary.late}</p>
          </div>
        </div>
      )}

      {/* History */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Attendance History</h2>

        {history.length === 0 ? (
          <p className="text-gray-500 text-center">No records yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((record) => (
              <li
                key={record._id}
                className="flex justify-between p-3 border rounded-lg"
              >
                <span>
                  {new Date(record.date).toLocaleDateString()}
                </span>
                <span
                  className={`font-semibold ${
                    record.status === "present"
                      ? "text-green-600"
                      : record.status === "absent"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {record.status.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Admin Table */}
      {isAdmin && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            All Users Attendance
          </h2>

          {allAttendance.length === 0 ? (
            <p className="text-gray-500 text-center">No records yet.</p>
          ) : (
            <table className="w-full table-auto border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">User</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {allAttendance.map((record) => (
                  <tr key={record._id} className="text-center">
                    <td className="border px-4 py-2">
                      {record.userId?.name || "Unknown"}
                    </td>

                    <td className="border px-4 py-2">
                      {record.userId?.email || "Unknown"}
                    </td>

                    <td className="border px-4 py-2">
                      {new Date(record.date).toLocaleDateString()}
                    </td>

                    <td
                      className={`border px-4 py-2 font-semibold ${
                        record.status === "present"
                          ? "text-green-600"
                          : record.status === "absent"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {record.status.toUpperCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
