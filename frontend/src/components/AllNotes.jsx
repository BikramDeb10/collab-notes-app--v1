import { useEffect, useState } from "react";
import axios from "axios";
import NoteList from "../components/NoteList";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notes`
        );

        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((note) => {
      if (filter === "All") return true;
      const age = Date.now() - new Date(note.updatedAt).getTime();
      if (filter === "Recent") return age < 24 * 60 * 60 * 1000;
      if (filter === "Old") return age > 7 * 24 * 60 * 60 * 1000;
      return true;
    });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">📚 All Notes</h1>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search notes by title..."
            className="flex-1 p-2 border border-gray-300 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Recent">Recent (Last 24h)</option>
            <option value="Old">Old (7+ days)</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <NoteList notes={filteredNotes} />
        )}
      </div>
    </div>
  );
};

export default AllNotes;
