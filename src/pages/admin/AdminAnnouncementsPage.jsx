import React, { useState, useEffect } from 'react';
import { 
    IconTrash, IconX, IconSend, IconSpeakerphone, IconAlertTriangle, 
    IconInfoCircle, IconBolt, IconClock, IconMoodEmpty, IconPencil
} from '@tabler/icons-react';

import { useAuth } from '../../context/AuthContext';
import {
    fetchAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
    updateAnnouncement,
} from '../../services/announcementService';

// === CATEGORY DETAIL MAPPER ===
const getCategoryDetails = (category) => {
    const normalizedCategory = (category || 'normal').toLowerCase(); 
    
    switch (normalizedCategory) {
        case 'urgent':
            return {
                label: "URGENT",
                color: "bg-red-100 text-red-700 ",
                icon: IconBolt,
                barColor: "bg-red-600"
            };
        case 'warning':
            return {
                label: "WARNING",
                color: "bg-yellow-100 text-yellow-700 ",
                icon: IconAlertTriangle,
                barColor: "bg-yellow-500"
            };
        case 'info':
            return {
                label: "INFO",
                color: "bg-blue-100 text-blue-700 ",
                icon: IconInfoCircle,
                barColor: "bg-blue-600"
            };
        case 'normal':
        default:
            return {
                label: "NORMAL",
                color: "bg-gray-100 text-gray-700 ",
                icon: IconSpeakerphone, // ✅ Updated
                barColor: "bg-gray-400"
            };
    }
};

// === CREATE ANNOUNCEMENT MODAL ===
const CreateAnnouncementModal = ({ isVisible, onClose, onAnnouncementCreated }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('info');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    if (!isVisible) return null;

    const handleSubmit = async () => {
        if (!title.trim() || !message.trim()) {
            setError("Title and message cannot be empty.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const newAnnouncement = await createAnnouncement({
                title,
                message,
                category: category.toLowerCase(),
            });

            onAnnouncementCreated(newAnnouncement);
            
            setTitle('');
            setMessage('');
            setCategory('info');
            onClose();

        } catch (err) {
            setError(err.message || 'Failed to publish announcement.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="bg-white  rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
               
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 text-gray-500 hover:text-red-500 transition rounded-full hover:bg-gray-100 "
                >
                    <IconX size={22} />
                </button>

                <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center">
                    <IconSpeakerphone size={24} className="mr-2 text-blue-600 " /> 
                    Create New Announcement
                </h2>

                {error && (
                    <div className="p-3 mb-4 text-sm text-red-800 bg-red-50  rounded-lg">
                        {error}
                    </div>
                )}

                <label className="block mb-2 text-sm font-medium text-gray-700 ">
                    Category
                </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg  "
                >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="urgent">Urgent</option>
                    <option value="normal">Normal</option>
                </select>

                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 ">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg "
                    placeholder="Announcement title"
                />

                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 ">
                    Message
                </label>
                <textarea
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg "
                    placeholder="Write your announcement..."
                />

                <button
                    onClick={handleSubmit}
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Publishing...' : 'Publish Announcement'}
                    <IconSend size={18} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

// === EDIT ANNOUNCEMENT MODAL ===
const EditAnnouncementModal = ({ isVisible, onClose, announcement, onAnnouncementUpdated }) => {
    const [title, setTitle] = useState(announcement ? announcement.title : '');
    const [message, setMessage] = useState(announcement ? announcement.message : '');
    const [category, setCategory] = useState(announcement ? announcement.category : 'info');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (announcement) {
            setTitle(announcement.title || '');
            setMessage(announcement.message || '');
            setCategory(announcement.category || 'info');
        }
    }, [announcement]);

    if (!isVisible) return null;

    const handleSubmit = async () => {
        if (!title.trim() || !message.trim()) {
            setError('Title and message cannot be empty.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const updated = await updateAnnouncement(announcement._id, {
                title,
                message,
                category: category.toLowerCase(),
            });

            onAnnouncementUpdated(updated);
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to update announcement.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="bg-white  rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 text-gray-500 hover:text-red-500 transition rounded-full hover:bg-gray-100 "
                >
                    <IconX size={22} />
                </button>

                <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center">
                    <IconPencil size={24} className="mr-2 text-blue-600 " />
                    Edit Announcement
                </h2>

                {error && (
                    <div className="p-3 mb-4 text-sm text-red-800 bg-red-50  rounded-lg">
                        {error}
                    </div>
                )}

                <label className="block mb-2 text-sm font-medium text-gray-700 ">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg  "
                >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="urgent">Urgent</option>
                    <option value="normal">Normal</option>
                </select>

                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 ">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg "
                    placeholder="Announcement title"
                />

                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 ">Message</label>
                <textarea
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg "
                    placeholder="Write your announcement..."
                />

                <button
                    onClick={handleSubmit}
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

// === MAIN PAGE ===
export default function AdminAnnouncementsPage() {
    const { user } = useAuth();
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editAnnouncement, setEditAnnouncement] = useState(null);

    const isAdmin = user && (user.role === 'admin' || user.role === 'superadmin');

    useEffect(() => {
        const loadAnnouncements = async () => {
            setIsLoading(true);
            try {
                const data = await fetchAnnouncements(); 
                setAnnouncements(data);
            } catch (err) {
                setError(err.message || "Could not load announcements.");
            } finally {
                setIsLoading(false);
            }
        };

        loadAnnouncements();
    }, []);

    const handleAnnouncementCreated = (newAnnouncement) => {
        setAnnouncements(prev => [newAnnouncement, ...prev]);
    };

    const handleAnnouncementUpdated = (updated) => {
        setAnnouncements(prev => prev.map(a => (a._id === updated._id ? updated : a)));
    };

    const handleDelete = async (id) => {
        if (!isAdmin) return;
        
        if (!window.confirm("Are you sure you want to delete this announcement?")) return;

        let backup = announcements;

        try {
            setAnnouncements(prev => prev.filter(a => a._id !== id));
            await deleteAnnouncement(id);
        } catch (err) {
            setAnnouncements(backup);
            console.error("Delete error:", err);
        }
    };

    if (isLoading) return (
        <div className="text-center pt-24 text-gray-500 ">
            Loading announcements...
        </div>
    );

    if (error) return (
        <div className="text-center pt-24 text-red-600 ">
            {error}
        </div>
    );

    return (
        <div className="pt-8 min-h-screen bg-gray-50 ">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900  flex items-center">
                        <IconSpeakerphone size={28} className="mr-2 text-blue-600 " /> 
                        Portal Announcements
                    </h1>

                    {isAdmin && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                            + Add Announcement
                        </button>
                    )}
                </div>

                {/* Announcements List */}
                {announcements.length === 0 ? (
                    <div className="text-center text-gray-500  pt-16">
                        <IconMoodEmpty size={48} className="mx-auto mb-4" />
                        No announcements yet.
                    </div>
                ) : (
                    <div className="space-y-6">
                        {announcements.map(({ _id, title, message, category, createdAt }) => {
                            const { label, color, icon: IconTag, barColor } = getCategoryDetails(category);

                            return (
                                <div 
                                    key={_id}
                                    className="bg-white  rounded-xl shadow p-5 border-l-8 transition"
                                    style={{ borderColor: barColor.replace("bg-", "") }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${color}`}>
                                                <IconTag size={14} className="mr-1" /> {label}
                                            </span>
                                            <h2 className="mt-2 text-xl font-semibold text-gray-900 ">
                                                {title}
                                            </h2>
                                            <p className="mt-1 text-gray-700 ">
                                                {message}
                                            </p>
                                            <div className="mt-3 flex items-center text-gray-500 ">
                                                <IconClock size={16} className="mr-1" />
                                                {new Date(createdAt).toLocaleString()}
                                            </div>
                                        </div>

                                        {isAdmin && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditAnnouncement({ _id, title, message, category, createdAt });
                                                        setShowEditModal(true);
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                                                >
                                                    <IconPencil size={18} />
                                                </button>

                                                <button 
                                                    onClick={() => handleDelete(_id)}
                                                    className="p-2 text-red-600 hover:bg-red-100  rounded-lg"
                                                >
                                                    <IconTrash size={20} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modal */}
            <CreateAnnouncementModal 
                isVisible={showModal} 
                onClose={() => setShowModal(false)} 
                onAnnouncementCreated={handleAnnouncementCreated}
            />
            <EditAnnouncementModal
                isVisible={showEditModal}
                onClose={() => { setShowEditModal(false); setEditAnnouncement(null); }}
                announcement={editAnnouncement}
                onAnnouncementUpdated={handleAnnouncementUpdated}
            />
        </div>
    );
}
