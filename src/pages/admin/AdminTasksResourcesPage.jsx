// 🌙 Fixed Full Code — Syntax Only

import React, { useState, useEffect } from 'react';
import { IconSearch, IconPlus, IconFileCheck, IconNotes, IconEye, IconX } from '@tabler/icons-react';
import TaskCreationModal from '../../components/TaskCreationModal';
import SubmissionListModal from '../../components/SubmissionListModal';
import { fetchAllTasks, createTask } from '../../services/tasksService';

import { createNewResource, fetchAllResources, deleteResource } from '../../services/resourcesMockService';
import ResourceCreationModal from '../../components/ResourceCreationModal';


// ======================
// TASK CARD COMPONENT
// ======================
const TaskCard = ({ title, dueDate, submissions, onView }) => (
    <div className="flex justify-between items-center p-4 mb-4 bg-white  rounded-lg shadow-md border-l-4 border-blue-900 ">
        <div>
            <h3 className="text-lg font-semibold text-gray-900 ">{title}</h3>
            <p className="text-sm text-gray-500 ">Due: {dueDate}</p>
            <p className="text-sm font-medium text-amber-600 0">{submissions} Submissions</p>
        </div>
        <button
            onClick={onView}
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition flex items-center"
        >
            <IconEye size={20} className="mr-1" /> View
        </button>
    </div>
);


// ======================
// TASKS MANAGEMENT
// ======================
const TasksManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSubmissionsForTask, setShowSubmissionsForTask] = useState(null);

    useEffect(() => {
        fetchAllTasks().then(data => setTasks(data));
    }, []);

    const handleViewSubmissions = (task) => {
        console.log(`[ACTION]: Viewing submissions for Task ID: ${task.id}`);
        setShowSubmissionsForTask(task);
    };

    const handleTaskCreationSuccess = async (newTaskDetails) => {
        const createdTask = await createTask(newTaskDetails);
        setTasks(prev => [createdTask, ...prev]);
    };

    const handleCreateNewTask = () => {
        console.log('[ACTION]: Opening modal to create new task');
        setShowCreateModal(true);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900  mb-4">All Tasks</h2>

            {/* Create Task Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 bg-white/40 backdrop-blur-sm flex justify-center items-center">
                    <TaskCreationModal
                        onClose={() => setShowCreateModal(false)}
                        onCreateSuccess={handleTaskCreationSuccess}
                    />
                </div>
            )}

            {/* Submissions Modal */}
            {showSubmissionsForTask && (
                <div className="fixed inset-0 z-50 bg-white/40 backdrop-blur-sm flex justify-center items-center">
                    <SubmissionListModal
                        task={showSubmissionsForTask}
                        onClose={() => setShowSubmissionsForTask(null)}
                    />
                </div>
            )}

            {/* Search Bar */}
            <div className="relative mb-6">
                <IconSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by task name..."
                    className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Tasks List */}
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    title={task.title}
                    dueDate={task.dueDate}
                    submissions={task.submissions}
                    onView={() => handleViewSubmissions(task)}
                />
            ))}

            {/* Floating Create Button */}
            <button
                onClick={handleCreateNewTask}
                className="fixed bottom-8 right-8 p-4 bg-amber-500 text-blue-900 rounded-full shadow-2xl hover:bg-amber-600 transition flex items-center font-semibold text-lg"
            >
                <IconPlus size={24} className="mr-2" /> Create New Task
            </button>
        </div>
    );
};


// ======================
// RESOURCE ITEM COMPONENT
// ======================
const ResourceItem = ({ title, link, category, onEdit, onDelete }) => (
    <div className="flex justify-between items-center p-4 mb-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200 ">
        <div>
            <h3 className="text-md font-semibold text-gray-900 ">{title}</h3>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600  hover:underline truncate max-w-xs block"
            >
                {link}
            </a>
            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full ">
                {category}
            </span>
        </div>

        <div className="flex space-x-2">
            <button
                onClick={onEdit}
                className="p-2 text-blue-600 hover:text-blue-800  rounded-full"
            >
                <IconNotes size={20} />
            </button>
            <button
                onClick={onDelete}
                className="p-2 text-red-600 hover:text-red-800  rounded-full"
            >
                <IconX size={20} />
            </button>
        </div>
    </div>
);


// ======================
// RESOURCES MANAGEMENT
// ======================
const ResourcesManagement = () => {
    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        const loadResources = async () => {
            setIsLoading(true);
            try {
                const fetched = await fetchAllResources();
                setResources(fetched);
            } catch (err) {
                console.error("Failed to fetch resources:", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadResources();
    }, []);

    const handleCreateResource = async (newResource) => {
        const created = await createNewResource(newResource);
        setResources(prev => [created, ...prev]);
        setShowCreateModal(false);
    };

    const handleDeleteResource = async (resourceId) => {
        if (window.confirm("Are you sure you want to delete this resource?")) {
            await deleteResource(resourceId);
            setResources(prev => prev.filter(r => r.id !== resourceId));
        }
    };

    const handleEditResource = (id) => {
        console.log(`[ACTION]: Opening edit modal for Resource ID: ${id}`);
    };

    const filteredResources = resources.filter(res =>
        res.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 ">All Resources</h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-amber-500 text-blue-900 rounded-lg shadow-md hover:bg-amber-600 transition flex items-center font-semibold"
                >
                    <IconPlus size={20} className="mr-2" /> Add New
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <IconSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by resource name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Resource List */}
            {isLoading ? (
                <p className="text-gray-500  text-center py-10">Loading resources...</p>
            ) : filteredResources.length > 0 ? (
                filteredResources.map(res => (
                    <ResourceItem
                        key={res.id}
                        title={res.name}
                        link={res.link}
                        category={res.category}
                        onEdit={() => handleEditResource(res.id)}
                        onDelete={() => handleDeleteResource(res.id)}
                    />
                ))
            ) : (
                <div className="text-center p-10 bg-gray-50 rounded-xl border border-gray-200 ">
                    <p className="text-gray-600 ">No resources found.</p>
                </div>
            )}

            {/* Create Resource Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-70 flex justify-center items-center backdrop-blur-sm">
                    <ResourceCreationModal
                        onResourceCreated={handleCreateResource}
                        onClose={() => setShowCreateModal(false)}
                    />
                </div>
            )}
        </div>
    );
};


// ======================
// MAIN PAGE
// ======================
const AdminTasksResourcesPage = () => {
    const [activeTab, setActiveTab] = useState('tasks');

    const renderContent = () => {
        switch (activeTab) {
            case 'tasks':
                return <TasksManagement />;
            case 'resources':
                return <ResourcesManagement />;
            default:
                return <TasksManagement />;
        }
    };

    const tabClasses = (tabName) =>
        `px-6 py-3 text-lg font-semibold transition duration-200 ${
            activeTab === tabName
                ? 'text-white border-b-4 border-amber-500'
                : 'text-gray-300 hover:text-gray-100'
        }`;

    return (
        <div className="bg-gray-100  min-h-screen">
            <header className="bg-blue-900  shadow-md">
                <div className="flex justify-between items-center px-6 py-4">
                    <h1 className="text-3xl font-extrabold text-white flex items-center">
                        <IconFileCheck size={28} className="mr-3 text-amber-500" /> Admin Tasks & Resources
                    </h1>
                </div>

                <nav className="flex border-b border-gray-700/50">
                    <button onClick={() => setActiveTab('tasks')} className={tabClasses('tasks')}>
                        Task Management
                    </button>
                    <button onClick={() => setActiveTab('resources')} className={tabClasses('resources')}>
                        Resource Management
                    </button>
                </nav>
            </header>

            <main className="max-w-7xl mx-auto py-6">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminTasksResourcesPage;
