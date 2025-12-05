import React, { useState, useEffect } from 'react';
import { 
    IconChevronUp, IconExternalLink, IconEye, IconFileText, 
    IconCheck, IconX, IconCalendar, IconCircleDot, IconClock, 
    IconLink, IconListDetails, IconSend, IconClipboardText,
    IconTrophy
} from '@tabler/icons-react';

// --- IMPORTANT: Ensure these paths are correct based on your file structure ---
import TaskSubmissionForm from '../../components/TaskSubmissionForm';
import TaskSubmissionViewer from '../../components/TaskSubmissionViewer';

// --- Sub-Component: Resource Section ---
const ResourceSection = ({ resources = [], taskId, studentId, onToggleRead }) => { 
    return (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 ">
            <h4 className="text-md font-semibold text-gray-800  mb-2 flex items-center">
                <IconLink size={18} className="mr-2 text-blue-600 " /> Supporting Resources
            </h4>
            <ul className="space-y-2">
                {resources.map((resource) => {
                    const isRead = resource.readBy ? resource.readBy.includes(studentId) : false;
                    
                    return (
                        <li key={resource.id} className="flex items-center justify-between text-sm">
                            <a 
                                href={resource.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 hover:underline flex items-center truncate max-w-[70%]"
                            >
                                {resource.title} <IconExternalLink size={16} className="ml-1 flex-shrink-0" />
                            </a>

                            <button
                                onClick={() => onToggleRead(taskId, resource.id, isRead)}
                                className={`flex items-center px-2 py-1 rounded-full text-xs transition ${
                                    isRead 
                                        ? 'bg-green-100 text-green-700  dark:text-green-300' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200  '
                                }`}
                            >
                                {isRead ? 'Marked Read' : 'Mark as Read'}
                                <IconCheck size={14} className="ml-1" />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

// --- MAIN COMPONENT ---
const TasksPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSubmissionModal, setShowSubmissionModal] = useState(null);
    const [showViewerModal, setShowViewerModal] = useState(null);

    const STUDENT_ID = 123;

    // MOCK TASKS
    const MOCK_TASKS = [
        {
            id: 1,
            title: "Informative Speech Outline",
            description: "Create a detailed outline for your 5-minute speech. Ensure the outline includes an introduction, three main points, and a conclusion with sources cited in APA format.",
            deadline: "2023-10-26",
            status: "TO_DO",
            resources: [
                { id: 101, title: "Outline Structure Guide", link: "#guide-link", category: "document", readBy: [] }
            ],
            submission: { link: '', notes: '' }
        },
        {
            id: 2,
            title: "Debate Case Research",
            description: "Find three pieces of compelling, high-quality evidence for your affirmative case on the resolution.",
            deadline: "2023-10-22",
            status: "SUBMITTED",
            resources: [
                { id: 201, title: "Research Video: Finding Quality Sources", link: "#video-link", category: "video", readBy: [123] }
            ],
            submission: { 
                link: "https://github.com/my-submission/debate-case-research", 
                notes: "Submitted early. I used the resource video to find better sources this time.",
                grade: null,
                feedback: null
            }
        },
        {
            id: 3,
            title: "Original Oratory Draft 1",
            description: "Complete the full text of your first draft. Focus on structural integrity and narrative flow.",
            deadline: "2023-10-15",
            status: "GRADED",
            resources: [],
            submission: { 
                link: "https://github.com/my-draft/oratory-draft-1", 
                notes: "Excited to hear your thoughts!", 
                grade: "B+", 
                feedback: "Good start, refine your introduction and strengthen your thesis."
            }
        }
    ];

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        setTimeout(() => {
            let filteredTasks = MOCK_TASKS;

            if (activeFilter !== 'All') {
                filteredTasks = MOCK_TASKS.filter(task => task.status === activeFilter);
            }

            setTasks(filteredTasks);
            setIsLoading(false);
        }, 500);
    }, [activeFilter]);

    // Submission success
    const handleSubmissionSuccess = (submittedTask) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === submittedTask.taskId
                    ? { ...task, status: 'SUBMITTED', submission: submittedTask.submission }
                    : task
            )
        );
        setShowSubmissionModal(null);
    };

    // View submission
    const handleViewSubmission = (task) => {
        if (task.status === 'SUBMITTED' || task.status === 'GRADED') {
            setShowViewerModal(task);
        }
    };

    // Toggle resource read
    const handleToggleResourceRead = (taskId, resourceId, isCurrentlyRead) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id !== taskId) return task;

                const updatedResources = task.resources.map(resource => {
                    if (resource.id !== resourceId) return resource;

                    let updatedReadBy = [...(resource.readBy || [])];

                    if (isCurrentlyRead) {
                        updatedReadBy = updatedReadBy.filter(id => id !== STUDENT_ID);
                    } else {
                        updatedReadBy.push(STUDENT_ID);
                    }

                    return { ...resource, readBy: updatedReadBy };
                });

                return { ...task, resources: updatedResources };
            })
        );
    };

    // Button
    const getButton = (task) => {
        const baseClass = "flex items-center justify-center w-full px-4 py-2 mt-4 text-lg font-semibold rounded-lg transition shadow-md";

        switch (task.status) {
            case 'TO_DO':
                return (
                    <button
                        onClick={() => setShowSubmissionModal(task)}
                        className={`${baseClass} text-blue-900 bg-yellow-400 hover:bg-yellow-500`}
                    >
                        Submit Assignment <IconSend size={20} className="ml-2" />
                    </button>
                );
            case 'SUBMITTED':
            case 'GRADED':
                return (
                    <button
                        onClick={() => handleViewSubmission(task)}
                        className={`${baseClass} text-white bg-blue-600 hover:bg-blue-700 `}
                    >
                        {task.status === 'GRADED' ? 'View Grade & Feedback' : 'View Submission'}
                        <IconEye size={20} className="ml-2" />
                    </button>
                );
            default:
                return null;
        }
    };

    // Status UI
    const getStatusInfo = (status) => {
        switch (status) {
            case 'TO_DO': return { color: 'text-red-500', dot: 'bg-red-500', icon: IconClock };
            case 'SUBMITTED': return { color: 'text-green-500', dot: 'bg-green-500', icon: IconCheck };
            case 'GRADED': return { color: 'text-purple-600', dot: 'bg-purple-600', icon: IconTrophy };
            default: return { color: 'text-gray-500', dot: 'bg-gray-500', icon: IconCircleDot };
        }
    };

    if (isLoading) return <div className="text-center mt-20 text-blue-600 ">Loading tasks...</div>;
    if (error) return <div className="text-center mt-20 text-red-600">Error loading tasks: {error}</div>;

    return (
        <div className="container mx-auto px-4 min-h-screen relative">
            
            {/* --- SUBMISSION MODAL --- */}
            {showSubmissionModal && (
                <div className="fixed inset-0 z-50 bg-white/40 backdrop-blur-sm flex justify-center items-center">
                    <div className="max-w-xl w-full mx-4">
                        <TaskSubmissionForm
                            taskId={showSubmissionModal.id}
                            taskTitle={showSubmissionModal.title}
                            onClose={() => setShowSubmissionModal(null)}
                            onSubmissionSuccess={handleSubmissionSuccess}
                        />
                    </div>
                </div>
            )}

            {/* --- VIEWER MODAL --- */}
            {showViewerModal && (
                <div className="fixed inset-0 z-50 bg-white/40 backdrop-blur-sm flex justify-center items-center">
                    <div className="max-w-xl w-full mx-4">
                        <TaskSubmissionViewer
                            task={showViewerModal}
                            onClose={() => setShowViewerModal(null)}
                        />
                    </div>
                </div>
            )}

            <h1 className="text-4xl font-extrabold text-gray-900  mb-8">
                <IconClipboardText size={32} className="inline mr-2 text-blue-600 " /> 
                My Assigned Tasks
            </h1>

            {/* Filter */}
            <div className="flex space-x-3 mb-8">
                {['All', 'TO_DO', 'SUBMITTED', 'GRADED'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-lg text-lg font-semibold transition ${
                            activeFilter === filter
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300  '
                        }`}
                    >
                        {filter.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* TASK LIST */}
            <div className="space-y-6">
                {tasks.length > 0 ? (
                    tasks.map(task => {
                        const { color, icon: StatusIcon } = getStatusInfo(task.status);

                        return (
                            <div key={task.id} className="bg-white  p-6 rounded-xl shadow-xl border border-gray-100  transition duration-300">
                                
                                {/* HEADER */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className={`text-sm font-semibold mb-1 flex items-center ${color}`}>
                                            <StatusIcon size={14} className="mr-1" /> {task.status.replace('_', ' ')}
                                        </p>

                                        <h2 className="text-2xl font-bold text-gray-900 ">
                                            {task.title}
                                        </h2>

                                        <p className="text-gray-600  flex items-center mt-1 text-sm">
                                            <IconCalendar size={16} className="mr-1" /> 
                                            Due: {new Date(task.deadline).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-500  pt-1">
                                        <IconClock size={16} className="inline mr-1" />
                                        Created: {new Date(task.createdAt || Date.now()).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* DESCRIPTION */}
                                <p className="mt-4 text-gray-700 ">{task.description}</p>

                                {/* RESOURCES */}
                                {task.resources?.length > 0 && (
                                    <ResourceSection 
                                        resources={task.resources}
                                        taskId={task.id}
                                        studentId={STUDENT_ID}
                                        onToggleRead={handleToggleResourceRead}
                                    />
                                )}

                                {/* BUTTON */}
                                {getButton(task)}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center p-10 bg-gray-50 rounded-xl border border-gray-200 ">
                        <IconCheck size={64} className="mx-auto text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 ">You're all caught up!</h3>
                        <p className="text-gray-600 ">No tasks match "{activeFilter.replace('_', ' ')}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TasksPage;
