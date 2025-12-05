import React, { useState } from 'react';
import { IconX, IconPlus, IconExternalLink, IconListDetails, IconTag, IconFileText } from '@tabler/icons-react';

const ResourceCreationModal = ({ onResourceCreated, onClose }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !link || !category) {
            alert("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        
        try {
            // Call the handler passed from the parent component (AdminTasksResourcesPage)
            await onResourceCreated({ name, link, category });
            
            // Clear form and close modal
            setName('');
            setLink('');
            setCategory('');
            onClose();
        } catch (error) {
            console.error("Failed to create resource:", error);
            alert("Failed to save the resource. Check the console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
            
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close"
                disabled={isLoading}
            >
                <IconX size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <IconPlus size={28} className="mr-2 text-green-600 dark:text-teal-400" /> 
                Add New Learning Resource
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Resource Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-1">
                        <IconFileText size={16} className="mr-1" /> Resource Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        placeholder="e.g., React Hooks Deep Dive (Video)"
                    />
                </div>

                {/* Resource Link/URL */}
                <div>
                    <label htmlFor="link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-1">
                        <IconExternalLink size={16} className="mr-1" /> Link/URL (https://...)
                    </label>
                    <input
                        id="link"
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        placeholder="https://youtube.com/resource"
                    />
                </div>

                {/* Resource Category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-1">
                        <IconTag size={16} className="mr-1" /> Category/Tag
                    </label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        placeholder="e.g., React, Git, Styling"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 flex items-center disabled:opacity-50"
                    >
                        {isLoading ? 'Creating...' : 'Create Resource'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResourceCreationModal;