import { apiClient } from './apiClient';

// === ADMIN FACING API CALLS ===

/**
 * [GET] Fetches all tasks, including submission counts, for the Admin view.
 */
export async function fetchTasksForAdmin() {
    return apiClient('/admin/tasks');
}

/**
 * [POST] Creates and assigns a new task.
 * @param {object} taskData - { title, description, dueDate, estimatedTime, resources: [...] }
 */
export async function createTask(taskData) {
    return apiClient('/admin/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
    });
}

/**
 * [GET] Fetches all submissions for a specific task.
 * @param {string} taskId - ID of the task.
 */
export async function fetchSubmissions(taskId) {
    return apiClient(`/admin/tasks/${taskId}/submissions`);
}

/**
 * [PATCH] Grades a specific student's submission for a task.
 * @param {string} taskId - ID of the task.
 * @param {string} studentId - ID of the student whose submission is being graded.
 * @param {object} gradeData - { grade, feedback }
 */
export async function gradeSubmission(taskId, studentId, gradeData) {
    return apiClient(`/admin/tasks/${taskId}/submissions/${studentId}/grade`, {
        method: 'PATCH',
        body: JSON.stringify(gradeData),
    });
}

/**
 * [POST] Creates a new standalone learning resource.
 * @param {object} resourceData - { name, url, category }
 */
export async function createLearningResource(resourceData) {
    return apiClient('/admin/resources', {
        method: 'POST',
        body: JSON.stringify(resourceData),
    });
}