import React, { useState } from 'react';
import { 
    IconSend, IconX, IconLink, IconListDetails, IconLoader2,
    IconClipboardText
} from '@tabler/icons-react';
import { submitTask } from '../services/tasksService'; // <-- NEW IMPORT

const TaskSubmissionForm = ({ taskId, taskTitle, onClose, onSubmissionSuccess }) => {
    const [submissionLink, setSubmissionLink] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => { // ⚠️ MUST be async
        e.preventDefault();
        setError(null);
        
        // Basic validation
        if (!submissionLink.trim()) {
            setError("Submission link cannot be empty.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Call the real API service
            const response = await submitTask(
                taskId, 
                submissionLink.trim(), 
                notes.trim()
            );
            
            setIsSubmitting(false);
            onSubmissionSuccess(response.submission); // Pass the new submission object back
            onClose(); 
        } catch (err) {
            setIsSubmitting(false);
            setError(`Submission failed: ${err.message}`);
            console.error(err);
        }
    };

    return (
        <div className="bg-white  p-7 rounded-xl shadow-2xl relative">
            <h2 className="text-2xl font-bold text-gray-900  flex items-center mb-1">
                <IconClipboardText size={24} className="mr-2 text-blue-600" /> Submit: {taskTitle}
            </h2>
            <p className="text-sm text-gray-500  mb-4">
                Please provide a link (e.g., GitHub, Google Drive) to your completed assignment.
            </p>

            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600  transition"
                disabled={isSubmitting}
            >
                <IconX size={24} />
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Submission Link Field */}
                <div>
                    <label htmlFor="submissionLink" className="block text-sm font-medium text-gray-700   items-center mb-1">
                        <IconLink size={16} className="mr-1" /> Assignment Link <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        id="submissionLink"
                        type="url"
                        value={submissionLink}
                        onChange={(e) => setSubmissionLink(e.target.value)}
                        placeholder="e.g., https://github.com/my-project"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                        disabled={isSubmitting}
                    />
                </div>

                {/* Notes/Comments Field */}
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700  flex items-center mb-1">
                        <IconListDetails size={16} className="mr-1" /> Notes for Mentor (Optional)
                    </label>
                    <textarea
                        id="notes"
                        rows="3"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any comments or issues for the mentor?"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                        disabled={isSubmitting}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg ">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full flex items-center justify-center px-4 py-2 text-lg font-semibold rounded-lg transition shadow-md bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <IconLoader2 size={20} className="mr-2 animate-spin" /> Submitting...
                        </>
                    ) : (
                        <>
                            <IconSend size={20} className="mr-2" /> Finalize Submission
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default TaskSubmissionForm;
