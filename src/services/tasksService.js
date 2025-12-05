// src/services/tasksService.js
const API_BASE_URL = "http://localhost:5000";

// ----------------------
// Helper Fetch Wrapper
// ----------------------
const fetchApi = async (url, options = {}) => {
    const token = localStorage.getItem("authToken");

    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`; 
    }

    const response = await fetch(`${API_BASE_URL}/api${url}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        let errorData = {};
        try {
            errorData = await response.json();
        } catch (e) {
            // Failed to parse server error response
            throw new Error(
                `API call failed: ${response.status} - ${response.statusText}`
            );
        }
        throw new Error(errorData.message || errorData.error || "API error"); 
    }

    if (response.status === 204) return null;

    return response.json();
};

// ----------------------
// ADMIN FUNCTIONS
// ----------------------

export const fetchAllTasks = async () => {
    const res = await fetchApi("/tasks");
    // Ensure array is returned even if res.tasks/res.data is missing
    return res.tasks || res.data || []; 
};

export const createTask = async (taskData) => {
    return fetchApi("/tasks", {
        method: "POST",
        body: JSON.stringify(taskData),
    });
};

export const fetchSubmissionsByTaskId = async (taskId) => {
    return fetchApi(`/tasks/${taskId}/submissions`);
};

export const gradeSubmission = async (
    taskId,
    studentId,
    finalGrade,
    adminFeedback
) => {
    return fetchApi(`/tasks/${taskId}/grade/${studentId}`, { 
        method: "POST",
        body: JSON.stringify({ finalGrade, adminFeedback }),
    });
};

// ----------------------
// STUDENT FUNCTIONS
// ----------------------
export const fetchTodoTasks = async () => {
    return fetchApi("/tasks/student/todo");
};

export const fetchSubmittedTasks = async () => {
    return fetchApi("/tasks/student/submitted");
};

export const fetchGradedTasks = async () => {
    return fetchApi("/tasks/student/graded");
};

export const submitTask = async (taskId, submissionLink, submissionNotes) => {
    return fetchApi(`/tasks/${taskId}/submit`, { 
        method: "POST",
        body: JSON.stringify({ submissionLink, submissionNotes }),
    });
};