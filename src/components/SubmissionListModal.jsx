import React, { useState, useEffect } from 'react';
import { IconX, IconUser, IconClock, IconEye, IconFileCheck, IconLoader2 } from '@tabler/icons-react';
import GradingDetailsModal from './GradingDetailsModal';
import { gradeSubmission, fetchSubmissionsByTaskId } from '../services/tasksService';

const SubmissionListModal = ({ task, onClose }) => {
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showGradingModal, setShowGradingModal] = useState(null);

    useEffect(() => {
        const loadSubmissions = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetchSubmissionsByTaskId(task.id);

                const normalized = response.submissions.map(sub => ({
                    ...sub,
                    studentName: sub.studentId?.name || 'Unknown Student',
                    submittedOn: new Date(sub.submittedAt).toLocaleDateString(),
                    status:
                        sub.grade === 'pending'
                            ? 'SUBMITTED'
                            : sub.grade === 'not-submitted'
                            ? 'TO_DO'
                            : 'GRADED',
                    link: sub.submissionText,
                }));

                setSubmissions(normalized.filter(s => s.status !== 'TO_DO'));
            } catch (err) {
                setError("Could not load submissions. Please check API connection.");
            } finally {
                setIsLoading(false);
            }
        };

        loadSubmissions();
    }, [task.id]);

    const pendingCount = submissions.filter(s => s.status === 'SUBMITTED').length;

    const handleViewAndGrade = submission => {
        setShowGradingModal({
            ...submission,
            taskTitle: task.title,
            submissionId: submission._id,
        });
    };

    const handleGradeSave = async ({ grade, feedback }) => {
        const sub = showGradingModal;
        const taskId = sub.taskId || task._id || task.id;
        const studentId = sub.studentId?._id || sub.studentId;

        if (!taskId || !studentId) {
            alert("Cannot grade: Missing user or task identifier.");
            return;
        }

        try {
            await gradeSubmission(taskId, studentId, grade, feedback);

            setSubmissions(prev =>
                prev.map(item =>
                    item._id === sub._id
                        ? { ...item, status: 'GRADED', grade, adminFeedback: feedback }
                        : item
                )
            );

            setShowGradingModal(null);
        } catch (err) {
            alert("Failed to save grade: " + err.message);
        }
    };

    return (
        <div className="bg-white  rounded-2xl shadow-2xl w-full max-w-xl p-6 relative mx-auto">

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600  transition"
            >
                <IconX size={24} />
            </button>

            {/* Header */}
            <h2 className="text-xl font-bold text-gray-900  mb-1 flex items-center gap-2">
                <IconFileCheck size={24} className="text-blue-600 " />
                Submissions – {task.title}
            </h2>

            <p className="text-sm text-gray-600  mb-5">
                Pending Review:
                <span className="font-semibold text-amber-600 ml-1">{pendingCount}</span>
            </p>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center items-center h-40">
                    <IconLoader2 size={28} className="animate-spin text-blue-500" />
                    <span className="ml-2 text-gray-500 text-sm">Loading...</span>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
            )}

            {/* No Data */}
            {!isLoading && submissions.length === 0 && !error && (
                <div className="p-4 text-center text-gray-500 italic bg-gray-100 rounded-lg text-sm">
                    No submissions yet.
                </div>
            )}

            {/* Submission List */}
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 custom-scroll">
                {submissions.map(sub => (
                    <div
                        key={sub._id}
                        className={`flex justify-between items-center p-4 rounded-xl shadow-sm border transition ${
                            sub.status === 'SUBMITTED'
                                ? 'bg-amber-50 border-amber-300'
                                : 'bg-green-50 border-green-300'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <IconUser size={20} className="text-blue-600" />
                            <div>
                                <h4 className="font-semibold text-gray-900  text-sm">
                                    {sub.studentName}
                                </h4>
                                <p className="text-xs text-gray-500  flex items-center">
                                    <IconClock size={14} className="mr-1" />
                                    {sub.submittedOn}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {sub.status === 'GRADED' && (
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
                                    {sub.grade}
                                </span>
                            )}

                            <button
                                onClick={() => handleViewAndGrade(sub)}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-xs flex items-center gap-1"
                            >
                                <IconEye size={16} />
                                {sub.status === 'GRADED' ? 'View' : 'Grade'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Grading Modal */}
            {showGradingModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center">
                    <GradingDetailsModal
                        submission={showGradingModal}
                        taskTitle={showGradingModal.taskTitle}
                        onGradeSave={handleGradeSave}
                        onClose={() => setShowGradingModal(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default SubmissionListModal;

