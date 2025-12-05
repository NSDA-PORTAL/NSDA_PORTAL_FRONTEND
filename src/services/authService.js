const API_BASE_URL = 'http://localhost:5000'; 

// Basic fetch wrapper for public (non-authenticated) routes
const publicFetch = async (url, options = {}) => {
    const response = await fetch(`${API_BASE_URL}/api/auth${url}`, { // Note the /api/auth prefix
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        let errorData = {};
        try {
            errorData = await response.json();
        } catch (e) {
            throw new Error(`API call failed with status ${response.status}: ${response.statusText}`);
        }
        throw new Error(errorData.message || 'Authentication error.');
    }

    if (response.status === 204) return null;
    return response.json();
};


export const registerUser = async (name, email, password) => {
    // The backend register endpoint is POST /api/auth/register
    return publicFetch('/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
    });
};


export const loginUser = async (email, password) => {
    // The backend login endpoint is POST /api/auth/login
    return publicFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
};