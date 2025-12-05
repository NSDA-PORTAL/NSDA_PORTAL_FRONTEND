import React, { useState } from 'react';
import { IconX, IconCalendar, IconFileText, IconLink, IconClock } from '@tabler/icons-react';
import { createTask } from '../services/tasksService'; 

const TaskCreationModal = ({ onClose, onCreateSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [resources, setResources] = useState([{ title: '', link: '' }]);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);

    const handleResourceChange = (index, field, value) => {
        const newResources = resources.map((res, i) => 
            i === index ? { ...res, [field]: value } : res
        );
        setResources(newResources);
    };

    const addResourceField = () => {
        setResources([...resources, { title: '', link: '' }]);
    };

    const removeResourceField = (index) => {
        setResources(resources.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => { // ⚠️ Made async
        e.preventDefault();
        setError(null);
        setIsCreating(true);
        
        const taskPayload = {
            title,
            description,
            // Backend expects 'deadline' (Date type). Send the ISO date string.
            deadline: dueDate, 
            estimatedTime, // Pass this even if the model doesn't explicitly save it
            resources: resources.filter(r => r.title && r.link), 
        };

        try {
            const response = await createTask(taskPayload);
            
            // response.task contains the newly created task from MongoDB
            onCreateSuccess(response.task);
            onClose(); 
        } catch (error) {
            console.error("Task creation failed:", error);
            setError("Failed to create task: " + error.message);
        } finally {
            setIsCreating(false);
        }
    };

    return (
       <div className="bg-white  
        rounded-2xl shadow-xl w-full max-w-lg p-5 relative border border-white/30">

        {/* Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 "
            aria-label="Close"
            disabled={isCreating}
        >
            <IconX size={22} />
        </button>
        
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-900  mb-4 flex items-center">
            <IconFileText size={24} className="mr-2 text-blue-600 " /> 
            Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700  mb-1">
                    Task Title
                </label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={isCreating}
                    className="w-full p-2.5 border border-gray-300 rounded-lg 
                      "
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700  mb-1">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    required
                    disabled={isCreating}
                    className="w-full p-2.5 border border-gray-300 rounded-lg 
                    "
                />
            </div>

            {/* Date + Time */}
            <div className="flex space-x-3">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700  mb-1 flex items-center">
                        <IconCalendar size={14} className="mr-1" /> Due Date
                    </label>
                    <input 
                        type="date" 
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        disabled={isCreating}
                        className="w-full p-2.5 border border-gray-300 rounded-lg 
                        "
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700  mb-1 flex items-center">
                        <IconClock size={14} className="mr-1" /> Est. Time
                    </label>
                    <input 
                        type="text" 
                        value={estimatedTime} 
                        onChange={(e) => setEstimatedTime(e.target.value)}
                        disabled={isCreating}
                        className="w-full p-2.5 border border-gray-300 rounded-lg 
                        "
                    />
                </div>
            </div>

            {/* Resources */}
            <div className="pt-2 border-t border-gray-300 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900  mb-2 flex items-center">
                    <IconLink size={16} className="mr-1" /> Supporting Resources
                </h3>

                {resources.map((resource, index) => (
                    <div key={index} className="flex space-x-2 mb-2 items-center">
                        <input
                            type="text"
                            placeholder="Title"
                            value={resource.title}
                            onChange={(e) => handleResourceChange(index, 'title', e.target.value)}
                            disabled={isCreating}
                            className="w-1/3 p-2 border border-white-300 rounded-lg 
                            "
                        />

                        <input
                            type="url"
                            placeholder="URL"
                            value={resource.link}
                            onChange={(e) => handleResourceChange(index, 'link', e.target.value)}
                            disabled={isCreating}
                            className="w-1/2 p-2 border border-gray-300 rounded-lg 
                            "
                        />

                        {resources.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeResourceField(index)}
                                disabled={isCreating}
                                className="p-2 text-red-500 hover:text-red-700 "
                            >
                                <IconX size={18} />
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addResourceField}
                    disabled={isCreating}
                    className="text-sm text-blue-600  hover:underline"
                >
                    + Add Resource
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="p-2 text-red-700 bg-red-100 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Submit */}
            <div className="pt-3">
                <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg 
                    hover:bg-blue-700 transition disabled:opacity-50 disabled:bg-gray-500"
                    disabled={isCreating}
                >
                    {isCreating ? 'Creating...' : 'Create Task'}
                </button>
            </div>
        </form>
    </div>
    );
};

export default TaskCreationModal;