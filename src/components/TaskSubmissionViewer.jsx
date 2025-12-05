import React from 'react';
import { IconX, IconLink, IconListDetails, IconTrophy, IconFileText, IconMessage } from '@tabler/icons-react';

const TaskSubmissionViewer = ({ task, onClose }) => {
    const { 
        status = 'TO_DO',
        submission = { link: '', notes: '' }, // Default submission object
        grade, 
        feedback,
        title
    } = task || {}; // Default task to empty object if null

    if (!task || !title) {
        return null; 
    }

    const isGraded = status === 'GRADED';

    // use the link 
    const linkText = submission.link || 'No link provided.';

    return (
        <div className="bg-white  rounded-xl shadow-2xl p-6 w-full max-w-xl relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600  transition"
                aria-label="Close"
            >
                <IconX size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-900  flex items-center mb-6">
                <IconFileText size={24} className="mr-2 text-blue-600 " /> Submission for: {title}
            </h2>

            <div className="space-y-4">
                
                {/* 1. Grade and Feedback Section (Only visible if Graded) */}
                {isGraded && (
                    <div className="p-4 bg-green-50  rounded-lg border border-green-200  shadow-inner">
                        <h3 className="text-xl font-bold text-green-700  flex items-center mb-2">
                            <IconTrophy size={20} className="mr-2" /> Mentor Grade & Feedback
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                             <p className="text-lg font-semibold text-gray-800 ">
                                Grade: <span className="text-green-600  font-extrabold">{grade || 'N/A'}</span>
                            </p>
                        </div>

                        <p className="font-semibold text-gray-800  flex items-center mt-3 mb-1">
                            <IconMessage size={18} className="mr-2 text-green-500" /> Feedback:
                        </p>
                        <p className="text-gray-700  p-3 bg-green-100  rounded-lg italic whitespace-pre-wrap">
                            {feedback || 'No detailed feedback provided yet.'}
                        </p>
                    </div>
                )}
                
                {/* 2. Submission Link */}
                <div className="p-3 bg-gray-50  rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-700  flex items-center mb-1">
                        <IconLink size={16} className="mr-1 text-blue-500" /> Submitted Link
                    </h3>
                    <a 
                        href={submission.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600  hover:underline break-all block"
                    >
                        {linkText}
                    </a>
                </div>

                {/* 3. Student Notes */}
                {submission.notes && (
                    <div className="p-3 bg-gray-50  rounded-lg">
                        <h3 className="text-sm font-semibold text-gray-700  flex items-center mb-1">
                            <IconListDetails size={16} className="mr-1 text-blue-500" /> Student Notes
                        </h3>
                        <p className="text-gray-700  whitespace-pre-wrap">{submission.notes}</p>
                    </div>
                )}
                
                {/* 4. Status Message */}
                {status === 'SUBMITTED' && (
                    <div className="p-3 mt-4 text-center bg-yellow-100  rounded-lg text-yellow-800  font-medium">
                        Task is submitted and awaiting mentor review.
                    </div>
                )}
            </div>

            <div className="mt-6 text-right">
                <button 
                    onClick={onClose} 
                    className="px-6 py-2 bg-gray-200  border-gray-300  rounded-lg text-gray-700  hover:bg-gray-300  transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default TaskSubmissionViewer;
