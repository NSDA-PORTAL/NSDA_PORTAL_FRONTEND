import React, { useEffect, useState } from 'react';
import { IconSpeakerphone, IconClock } from '@tabler/icons-react';
import { fetchAnnouncements } from '../services/announcementService';

export default function AnnouncementsList({ limit = 5 }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchAnnouncements();
        if (!mounted) return;
        setAnnouncements(data.slice(0, limit));
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Failed to load announcements');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [limit]);

  if (loading) return <div className="p-4">Loading announcements...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!announcements || announcements.length === 0) return <div className="p-4 text-gray-500">No announcements.</div>;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <IconSpeakerphone size={20} className="mr-2 text-blue-600" /> Portal Announcements
      </h3>

      <ul className="mt-3 space-y-3">
        {announcements.map(a => (
          <li key={a._id} className="border-l-4 pl-3 py-2">
            <div className="flex items-center justify-between">
              <strong className="text-sm text-gray-900">{a.title}</strong>
              <span className="text-xs text-gray-500 flex items-center">
                <IconClock size={14} className="mr-1" />
                {new Date(a.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-1">{a.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
