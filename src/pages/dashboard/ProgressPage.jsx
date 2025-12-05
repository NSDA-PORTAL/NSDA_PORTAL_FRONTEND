import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import {
  IconClock,
  IconMoodEmpty,
  IconClipboardCheck,
  IconUserCheck,
} from "@tabler/icons-react";

const ProgressPage = () => {
  // === MOCK DATA ===
  const attendanceData = [
    {
      name: "Attendance",
      value: 40, // percentage
      fill: "#f4b437",
    },
  ];

  const tasksData = [
    { title: "Project brief for Modern UI/UX Design Principles", time: "2h ago" },
    { title: "Advanced Prototyping Workshop", time: "1d ago" },
    { title: "Mid-term evaluations available", time: "3d ago" },
    { title: "Mentor office hours moved to Tuesday", time: "5d ago" },
  ];

  const gradesData = [
    { label: "Attendance Score", value: "85/100" },
    { label: "Task Completion", value: "92%" },
    { label: "Mentor Evaluation", value: "A-" },
    { label: "Overall Grade", value: "B+" },
  ];

  return (
    <div className="p-6 space-y-8 w-full min-h-screen bg-gray-50 ">
      <h1 className="text-2xl font-semibold text-gray-900 ">My Progress</h1>

      {/* Attendance Tracker */}
      <div className="bg-white  rounded-xl shadow-sm p-6">
        <div className="flex flex-col items-center">
          <h2 className="font-semibold mb-4 text-gray-900 ">
            Attendance Tracker
          </h2>

          <div className="relative w-40 h-40 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={15}
                data={attendanceData}
                startAngle={90}
                endAngle={-270}
              >
                {/* Background Circle */}
                <RadialBar
                  data={[{ value: 100 }]}
                  dataKey="value"
                  fill="#e6e6e6"
                  cornerRadius={10}
                  clockwise
                />
                {/* Attendance Value */}
                <RadialBar
                  dataKey="value"
                  data={attendanceData}
                  cornerRadius={10}
                  clockwise
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 text-xl font-bold text-gray-900 ">
              {attendanceData[0].value}%
            </div>
          </div>

          {/* Grades Cards */}
          <div className="mt-6 grid grid-cols-2 gap-4 w-full">
            {gradesData.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-100  p-4 rounded-lg flex flex-col items-center"
              >
                <p className="text-sm text-gray-500 ">{item.label}</p>
                <p className="text-xl font-bold text-gray-900 ">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements & Tasks */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 ">
          Announcements & Tasks
        </h2>
        {tasksData.length === 0 ? (
          <div className="text-center p-6 bg-white  rounded-xl shadow">
            <IconMoodEmpty size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-700 ">No announcements yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasksData.map((task, idx) => (
              <div
                key={idx}
                className="bg-white  p-4 rounded-xl shadow-sm border border-gray-100 "
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-900 ">{task.title}</p>
                    <p className="text-xs text-gray-400 flex items-center mt-1">
                      <IconClock size={12} className="mr-1" />
                      {task.time}
                    </p>
                  </div>
                  <IconClipboardCheck size={20} className="text-green-500" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;