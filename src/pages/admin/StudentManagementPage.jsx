import React, { useState, useMemo } from "react";
const sampleStudents = [
  {
    id: "1",
    name: "Ametellah Abdullah",
    email: "nsda_community@gmail.com",
    phone: "+251 900000000",
    track: "react.js",
    batch: "Batch A",
    mentor: "Sister S.",
    status: "Active",
    joinDate: "2025-08-12",
    gender: "Female",
    profileImage: "",
    address: "Addis Ababa, Ethiopia",
    notes: "Excellent progress on project 1",
  },
  {
    id: "2",
    name: "Abdurahman Abdullah",
    email: "islam11111@gmail.com",
    phone: "+251 900000000",
    track: "node.js",
    batch: "Batch B",
    mentor: "Brother A.",
    status: "Active",
    joinDate: "2024-09-01",
    gender: "Male",
    profileImage: "",
    address: "Bole, Addis Ababa",
    notes: "",
  },
  {
    id: "3",
    name: "Rahaf Abdullah",
    email: "islam11111@gmail.com",
    phone: "+251 900000000",
    track: "UI/UX Design",
    batch: "Batch A",
    mentor: "Sister L.",
    status: "Inactive",
    joinDate: "2023-11-20",
    gender: "Female",
    profileImage: "",
    address: "Bahir Dar, Amhara",
    notes: "On temporary leave",
  },
];

const TRACKS = [
  "Node.js",
  "React.js",
  "UI/UX Design",
  "flutter",
  "Bignner track(HTML, CSS, JS)",
];

const BATCHES = ["Batch A", "Batch B", "Batch C"];
const MENTORS = ["Sister S.", "Sister L.", "Brother A.", "Brother H."];

const emptyStudent = {
  id: "",
  name: "",
  email: "",
  phone: "",
  track: "",
  batch: "",
  mentor: "",
  status: "Active",
  joinDate: "",
  gender: "",
  profileImage: "",
  address: "",
  notes: "",
};

const StudentManagementPage = () => {
  const [students, setStudents] = useState(sampleStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [trackFilter, setTrackFilter] = useState("All");

  const [isAddOpen, setAddOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isAssignOpen, setAssignOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const [activeStudent, setActiveStudent] = useState(null);
  // Controlled form state for add/edit
  const [form, setForm] = useState(emptyStudent);
  // Derived filtered students
  const filteredStudents = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return students.filter((s) => {
      if (statusFilter !== "All" && s.status !== statusFilter) return false;
      if (trackFilter !== "All" && s.track !== trackFilter) return false;

      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.track || "").toLowerCase().includes(q) ||
        (s.batch || "").toLowerCase().includes(q) ||
        (s.mentor || "").toLowerCase().includes(q) ||
        (s.phone || "").toLowerCase().includes(q)
      );
    });
  }, [students, searchTerm, statusFilter, trackFilter]);

  const openAdd = () => {
    setForm({
      ...emptyStudent,
      joinDate: new Date().toISOString().slice(0, 10),
      status: "Active",
    });
    setAddOpen(true);
  };

  const openEdit = (student) => {
    setForm({ ...student });
    setActiveStudent(student);
    setEditOpen(true);
  };

  const openAssign = (student) => {
    setForm({
      id: student.id,
      track: student.track || "",
      batch: student.batch || "",
      mentor: student.mentor || "",
    });
    setActiveStudent(student);
    setAssignOpen(true);
  };

  const openProfile = (student) => {
    setActiveStudent(student);
    setProfileOpen(true);
  };

  const closeAll = () => {
    setAddOpen(false);
    setEditOpen(false);
    setAssignOpen(false);
    setProfileOpen(false);
    setActiveStudent(null);
    setForm(emptyStudent);
  };
  // Add student
  const handleAddSubmit = (e) => {
    e.preventDefault();
    // basic validation
    if (!form.name.trim() || !form.email.trim()) {
      alert("Name and email are required.");
      return;
    }
    const newStudent = {
      ...form,
      id: Date.now().toString(),
      joinDate: form.joinDate || new Date().toISOString().slice(0, 10),
    };
    setStudents((p) => [newStudent, ...p]);
    setAddOpen(false);
    setForm(emptyStudent);
  };

  // Edit student
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      alert("Name and email are required.");
      return;
    }
    setStudents((p) =>
      p.map((s) => (s.id === form.id ? { ...s, ...form } : s))
    );
    setEditOpen(false);
    setActiveStudent(null);
    setForm(emptyStudent);
  };

  // Assign track/batch/mentor
  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!activeStudent) return;
    setStudents((p) =>
      p.map((s) =>
        s.id === activeStudent.id
          ? { ...s, track: form.track, batch: form.batch, mentor: form.mentor }
          : s
      )
    );
    setAssignOpen(false);
    setActiveStudent(null);
    setForm(emptyStudent);
  };

  // Toggle active/inactive
  const handleToggleStatus = (studentId) => {
    setStudents((p) =>
      p.map((s) =>
        s.id === studentId
          ? {
              ...s,
              status: s.status === "Blacklisted" ? "Active" : "Blacklisted",
            }
          : s
      )
    );
  };

  // Delete student (optional - destructive)
  const handleDelete = (studentId) => {
    if (!window.confirm("Delete this student? This action cannot be undone."))
      return;
    setStudents((p) => p.filter((s) => s.id !== studentId));
  };

  // Form input helper
  const updateForm = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  // UI Render
  return (
    <div className="bg-gray-50 min-h-screen pt-[120px] flex justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">
              Student Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Admin dashboard — manage students, assignments, and profiles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border bg-white"
                aria-label="Filter by status"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={trackFilter}
                onChange={(e) => setTrackFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border bg-white"
                aria-label="Filter by track"
              >
                <option value="All">All Tracks</option>
                {TRACKS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={openAdd}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg shadow"
            >
              + Add Student
            </button>
          </div>
        </header>

        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Search by name, email, track, batch, mentor, phone..."
            className="flex-1 px-4 py-2 rounded-xl border bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
                setTrackFilter("All");
              }}
              className="px-3 py-2 rounded-lg border bg-white"
            >
              Reset
            </button>
            <div className="sm:hidden">
              {/* small-screen quick filters */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border bg-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        {/* MOBILE: Cards */}
        <div className="space-y-4 md:hidden">
          {filteredStudents.length === 0 && (
            <p className="text-gray-500 text-center">No students found.</p>
          )}

          {filteredStudents.map((s) => (
            <div key={s.id} className="bg-white rounded-xl shadow p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-medium text-gray-700">
                  {s.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{s.name}</h3>
                      <p className="text-sm text-gray-500">{s.email}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openProfile(s)}
                        className="text-sm px-2 py-1 rounded text-blue-700"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openEdit(s)}
                        className="text-sm px-2 py-1 rounded text-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openAssign(s)}
                        className="text-sm px-2 py-1 rounded text-yellow-700"
                      >
                        Assign
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Track</p>
                      <p className="text-gray-800">{s.track || "-"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Batch</p>
                      <p className="text-gray-800">{s.batch || "-"}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        s.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.status}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(s.id)}
                        className="text-sm px-2 py-1 rounded border"
                      >
                        {s.status === "Active" ? "Blacklist" : "Unblacklist"}
                      </button>

                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-sm px-2 py-1 rounded border text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP: Table */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-auto">
          <table className="min-w-full">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                        {s.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {s.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        s.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openProfile(s)}
                        className="text-sm text-blue-700"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openEdit(s)}
                        className="text-sm text-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openAssign(s)}
                        className="text-sm text-yellow-700"
                      >
                        Assign
                      </button>
                      <button
                        onClick={() => handleToggleStatus(s.id)}
                        className="text-sm text-gray-700"
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-sm text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD STUDENT MODAL */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Add Student</h2>
                <button onClick={closeAll} className="text-gray-500">
                  Close
                </button>
              </div>

              <form
                onSubmit={handleAddSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="Full name"
                  className="px-3 py-2 border rounded"
                />
                <input
                  required
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="Email"
                  className="px-3 py-2 border rounded"
                />
                <input
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  placeholder="Phone"
                  className="px-3 py-2 border rounded"
                />
                <select
                  value={form.gender}
                  onChange={(e) => updateForm("gender", e.target.value)}
                  className="px-3 py-2 border rounded"
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <select
                  value={form.track}
                  onChange={(e) => updateForm("track", e.target.value)}
                  className="px-3 py-2 border rounded"
                >
                  <option value="">Select track</option>
                  {TRACKS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <select
                  value={form.batch}
                  onChange={(e) => updateForm("batch", e.target.value)}
                  className="px-3 py-2 border rounded"
                >
                  <option value="">Select batch</option>
                  {BATCHES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                <select
                  value={form.mentor}
                  onChange={(e) => updateForm("mentor", e.target.value)}
                  className="px-3 py-2 border rounded"
                >
                  <option value="">Select mentor</option>
                  {MENTORS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                <input
                  value={form.joinDate}
                  onChange={(e) => updateForm("joinDate", e.target.value)}
                  type="date"
                  className="px-3 py-2 border rounded"
                />
                <input
                  value={form.profileImage}
                  onChange={(e) => updateForm("profileImage", e.target.value)}
                  placeholder="Profile image URL (optional)"
                  className="px-3 py-2 border rounded"
                />

                <input
                  value={form.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  placeholder="Address"
                  className="px-3 py-2 border rounded col-span-1 md:col-span-2"
                />
                <textarea
                  value={form.notes}
                  onChange={(e) => updateForm("notes", e.target.value)}
                  placeholder="Notes"
                  className="px-3 py-2 border rounded col-span-1 md:col-span-2"
                />

                <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={closeAll}
                    className="px-4 py-2 rounded border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-amber-500 text-white"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditOpen && activeStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Edit Student</h2>
                <button onClick={closeAll} className="text-gray-500">
                  Close
                </button>
              </div>

              <form
                onSubmit={handleEditSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="Full name"
                  className="px-3 py-2 border rounded"
                />
                <input
                  required
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="Email"
                  className="px-3 py-2 border rounded"
                />
                <input
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  placeholder="Phone"
                  className="px-3 py-2 border rounded"
                />
                <select
                  value={form.gender}
                  onChange={(e) => updateForm("gender", e.target.value)}
                  className="px-3 py-2 border rounded"
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <select
                  value={form.track}
                  onChange={(e) => updateForm("track", e.target.value)}
                  className="px-3 py-2 border rounded"
                >
                  <option value="">Select track</option>
                  {TRACKS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <select
                  value={form.batch}
                  onChange={(e) => updateForm("batch", e.target.value)}
                  className="px-3 py-2 border rounded"
                >
                  <option value="">Select batch</option>
                  {BATCHES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                <select
                  value={form.mentor}
                  onChange={(e) => updateForm("mentor", e.target.value)}
                  className="px-3 py-2 border rounded"
                >
                  <option value="">Select mentor</option>
                  {MENTORS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                <input
                  value={form.joinDate}
                  onChange={(e) => updateForm("joinDate", e.target.value)}
                  type="date"
                  className="px-3 py-2 border rounded"
                />
                <input
                  value={form.profileImage}
                  onChange={(e) => updateForm("profileImage", e.target.value)}
                  placeholder="Profile image URL (optional)"
                  className="px-3 py-2 border rounded"
                />

                <input
                  value={form.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  placeholder="Address"
                  className="px-3 py-2 border rounded col-span-1 md:col-span-2"
                />
                <textarea
                  value={form.notes}
                  onChange={(e) => updateForm("notes", e.target.value)}
                  placeholder="Notes"
                  className="px-3 py-2 border rounded col-span-1 md:col-span-2"
                />

                <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={closeAll}
                    className="px-4 py-2 rounded border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-indigo-600 text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ASSIGN TRACK/BATCH/MENTOR MODAL */}
        {isAssignOpen && activeStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-xl w-full max-w-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Assign Track / Batch / Mentor
                </h2>
                <button onClick={closeAll} className="text-gray-500">
                  Close
                </button>
              </div>

              <form
                onSubmit={handleAssignSubmit}
                className="grid grid-cols-1 gap-3"
              >
                <div>
                  <label className="text-sm text-gray-600">Track</label>
                  <select
                    value={form.track}
                    onChange={(e) => updateForm("track", e.target.value)}
                    className="w-full px-3 py-2 border rounded mt-1"
                  >
                    <option value="">Select track</option>
                    {TRACKS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-600">Batch</label>
                  <select
                    value={form.batch}
                    onChange={(e) => updateForm("batch", e.target.value)}
                    className="w-full px-3 py-2 border rounded mt-1"
                  >
                    <option value="">Select batch</option>
                    {BATCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-600">Mentor</label>
                  <select
                    value={form.mentor}
                    onChange={(e) => updateForm("mentor", e.target.value)}
                    className="w-full px-3 py-2 border rounded mt-1"
                  >
                    <option value="">Select mentor</option>
                    {MENTORS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={closeAll}
                    className="px-4 py-2 rounded border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-yellow-600 text-white"
                  >
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isProfileOpen && activeStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-medium">
                    {(activeStudent.name || "")
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {activeStudent.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {activeStudent.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activeStudent.phone}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <button onClick={closeAll} className="text-gray-500">
                    Close
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Track</p>
                  <p className="font-medium">{activeStudent.track || "-"}</p>
                </div>

                <div>
                  <p className="text-gray-500">Batch</p>
                  <p className="font-medium">{activeStudent.batch || "-"}</p>
                </div>

                <div>
                  <p className="text-gray-500">Mentor</p>
                  <p className="font-medium">{activeStudent.mentor || "-"}</p>
                </div>

                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium">{activeStudent.status}</p>
                </div>

                <div>
                  <p className="text-gray-500">Joined</p>
                  <p className="font-medium">{activeStudent.joinDate}</p>
                </div>

                <div>
                  <p className="text-gray-500">Gender</p>
                  <p className="font-medium">{activeStudent.gender || "-"}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-gray-500">Address</p>
                  <p className="font-medium">{activeStudent.address || "-"}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-gray-500">Notes</p>
                  <p className="font-medium whitespace-pre-line">
                    {activeStudent.notes || "-"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setProfileOpen(false); // close view modal
                    openEdit(activeStudent); // open edit modal
                  }}
                  className="px-4 py-2 rounded border"
                >
                  Edit
                </button>
                <button
                  onClick={closeAll}
                  className="px-4 py-2 rounded bg-blue-600 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagementPage;