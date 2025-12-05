import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { AiOutlineUpload } from "react-icons/ai";

const AdminOverviewPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Welcome, Admin!</h1>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          High-Level KPIs
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-sm p-4 rounded-xl">
            <p className="text-sm text-gray-500">Total Active Students</p>
            <p className="text-3xl font-bold text-blue-600">56</p>
          </div>

          <div className="bg-white shadow-sm p-4 rounded-xl">
            <p className="text-sm text-gray-500">Pending Submissions</p>
            <p className="text-3xl font-bold text-blue-600">26</p>
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 rounded-xl mt-4">
          <p className="text-sm text-gray-500 mb-1">Average Portal Progress</p>
          <p className="text-2xl font-bold text-yellow-500">68%</p>

          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-2 bg-yellow-500 rounded-full"
              style={{ width: "68%" }}
            ></div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 rounded-xl mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">New Announcements</p>
          <p className="text-3xl font-bold text-blue-600">5</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Recent Activity Feed
        </h2>

        <div className="space-y-3">
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-start gap-3 hover:scale-[1.01] transition">
            <AiOutlineUpload className="text-blue-600 text-2xl" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Jane Doe submitted ‘Task 3’
              </p>
              <p className="text-sm text-gray-500">Web Development Track</p>
            </div>
            <span className="text-xs text-gray-400">2m ago</span>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm flex items-start gap-3 hover:scale-[1.01] transition">
            <FaUserPlus className="text-blue-600 text-xl mt-1" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                New registration: John Smith
              </p>
              <p className="text-sm text-gray-500">Data Science Track</p>
            </div>
            <span className="text-xs text-gray-400">1h ago</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Student Progress & Attendance
        </h2>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm hover:scale-[1.01] transition">
            <div className="flex justify-between items-center mb-1">
              <div>
                <p className="font-semibold text-gray-900">Alex Johnson</p>
                <p className="text-sm text-gray-500">Web Development Track</p>
              </div>
              <p className="font-bold text-yellow-600">75%</p>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full mt-2 mb-3">
              <div
                className="h-2 bg-yellow-500 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>

            <button className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg">
              Mark Attendance
            </button>
          </div>

          {/* This section was the beginning of the second message in your input and is now correctly placed */}
          <div className="bg-white p-4 rounded-xl shadow-sm hover:scale-[1.01] transition">
            <div className="flex justify-between items-center mb-1">
              <div>
                <p className="font-semibold text-gray-900">Maria Garcia</p>
                <p className="text-sm text-gray-500">UX/UI Design Track</p>
              </div>
              <p className="font-bold text-yellow-600">45%</p>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full mt-2 mb-3">
              <div
                className="h-2 bg-yellow-500 rounded-full"
                style={{ width: "45%" }}
              ></div>
            </div>

            <button className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg">
              Mark Attendance
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm hover:scale-[1.01] transition">
            <div className="flex justify-between items-center mb-1">
              <div>
                <p className="font-semibold text-gray-900">Chen Wei</p>
                <p className="text-sm text-gray-500">Data Science Track</p>
              </div>
              <p className="font-bold text-yellow-600">92%</p>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full mt-2 mb-3">
              <div
                className="h-2 bg-yellow-500 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>

            <button className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg">
              Attendance Marked
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;