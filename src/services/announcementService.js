// Base URL for your API, using Vite env var so we can point to deployed backend
const API_BASE = import.meta.env.VITE_API_URL || '';
const ANNOUNCEMENTS_API_BASE = `${API_BASE}/api/announcements`;

// Helper function to get the auth token from localStorage
const getAuthToken = () => {
    // Auth token is stored under 'token' by the AuthContext
    return localStorage.getItem('token');
};

/**
 * Fetches all announcements. Accessible by both student and admin.
 * @returns {Promise<Array>} List of announcement objects
 */
export const fetchAnnouncements = async () => {
    const token = getAuthToken();
    try {
        const response = await fetch(ANNOUNCEMENTS_API_BASE, {
            headers: {
                'Content-Type': 'application/json',
                // Pass the JWT token for authentication
                'Authorization': `Bearer ${token}`, 
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch announcements.');
        }

        const data = await response.json();
        return data.data; // The backend structure is { success: true, data: [...] }
    } catch (error) {
        console.error("API Error (fetchAnnouncements):", error);
        throw error;
    }
};

/**
 * Admin: Creates a new announcement.
 * @param {object} announcementData - { title, message, category }
 * @returns {Promise<object>} The newly created announcement object
 */
export const createAnnouncement = async (announcementData) => {
    const token = getAuthToken();
    try {
        const response = await fetch(ANNOUNCEMENTS_API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Fixed syntax
            },
            body: JSON.stringify(announcementData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create announcement.');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("API Error (createAnnouncement):", error);
        throw error;
    }
};

/**
 * Admin: Updates an announcement by ID.
 * @param {string} id - Announcement ID
 * @param {object} updateData - { title?, message?, category? }
 * @returns {Promise<object>} Updated announcement
 */
export const updateAnnouncement = async (id, updateData) => {
    const token = getAuthToken();

    try {
        const response = await fetch(`${ANNOUNCEMENTS_API_BASE}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update announcement.');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('API Error (updateAnnouncement):', error);
        throw error;
    }
};

/**
 * Admin: Deletes an announcement by ID.
 * @param {string} id - The ID of the announcement to delete
 * @returns {Promise<void>}
 */
export const deleteAnnouncement = async (id) => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${ANNOUNCEMENTS_API_BASE}/${id}`, { // Fixed template literal
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Fixed syntax
            },
        });

        if (response.status === 404) {
             throw new Error("Announcement not found.");
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete announcement.');
        }
        
        // Success (200 OK or 204 No Content)
    } catch (error) {
        console.error("API Error (deleteAnnouncement):", error);
        throw error;
    }
};
