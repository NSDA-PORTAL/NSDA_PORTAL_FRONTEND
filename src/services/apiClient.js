const API_BASE_URL = 'http://localhost:8080/api'; 

export async function apiClient(endpoint, options = {}) {
    // Rule 3: Attach authToken from localStorage as a Bearer Token
    const token = localStorage.getItem('authToken'); 
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        // Attempt to parse API error message
        const errorData = await response.json().catch(() => ({ message: 'Unknown API error.' }));
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    // Handle responses that might return 204 No Content
    if (response.status === 204) return null;
    
    return response.json();
}