import React, { useState } from 'react';
import { IconX, IconCheck, IconFileText } from '@tabler/icons-react';

const GradingDetailsModal = ({ submission, taskTitle, onGradeSave, onClose }) => {
    // State to hold the admin's input
    const [grade, setGrade] = useState(submission.grade || '');
    const [feedback, setFeedback] = useState(submission.feedback || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        // 1. Validate input (basic check)
        if (!grade) {
            alert("Please enter a grade.");
            setIsSaving(false);
            return;
        }

        // 2. Call the provided save handler (which calls the mock service)
        await onGradeSave({
            taskId: submission.taskId, // Assuming submission object contains taskId
            studentId: submission.studentId,
            grade: grade,
            feedback: feedback
        });
        
        setIsSaving(false);
        onClose(); // Close the modal upon success
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl p-6 relative">
            
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close"
                disabled={isSaving}
            >
                <IconX size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <IconFileText size={28} className="mr-2 text-blue-600 dark:text-amber-500" /> 
                Grade Submission: {taskTitle}
            </h2>
            
            {/* Student Submission Details */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
                <p className="font-semibold text-gray-800 dark:text-gray-200">Student: {submission.studentName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Submitted Link: 
                    <a href={`http://${submission.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                        {submission.link}
                    </a>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Notes: {submission.notes || "No notes provided."}</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
                {/* Grade Input */}
                <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Final Grade</label>
                    <input
                        id="grade"
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        placeholder="e.g., A, 95%, Excellent"
                    />
                </div>

                {/* Feedback Textarea */}
                <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Feedback to Student</label>
                    <textarea
                        id="feedback"
                        rows="4"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        placeholder="Provide constructive feedback here..."
                    />
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 flex items-center disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Grade'} <IconCheck size={20} className="ml-2" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GradingDetailsModal;