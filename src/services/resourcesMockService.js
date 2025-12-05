// Mock data store for resources
let resourcesData = [
    { id: 201, name: "React Hooks Deep Dive (Video)", link: "https://youtube.com/react-hooks-deep", category: "Advanced React" },
    { id: 202, name: "Gitflow Workflow Guide", link: "https://docs.nsda.io/gitflow", category: "Version Control" },
    { id: 203, name: "Tailwind CSS Utility Guide", link: "https://tailwindcss.com/docs", category: "Styling" },
];

// 1. READ Operation: Fetch all resources
export const fetchAllResources = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...resourcesData]);
        }, 300); // Simulate network delay
    });
};

// 2. CREATE Operation: Add a new resource
export const createNewResource = (newResource) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const resourceWithId = { 
                ...newResource, 
                id: Math.floor(Math.random() * 1000) + 300, // Mock ID generation
            };
            resourcesData.push(resourceWithId); // Add to mock store
            console.log("[MOCK SUCCESS]: Created new resource:", resourceWithId.name);
            resolve(resourceWithId);
        }, 500);
    });
};

// 3. DELETE Operation: Mock delete (optional, but good practice)
export const deleteResource = (resourceId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const initialLength = resourcesData.length;
            resourcesData = resourcesData.filter(r => r.id !== resourceId);
            if (resourcesData.length < initialLength) {
                console.log(`[MOCK SUCCESS]: Deleted resource ID ${resourceId}`);
                resolve({ success: true, id: resourceId });
            } else {
                reject(new Error(`Resource ID ${resourceId} not found.`));
            }
        }, 300);
    });
};