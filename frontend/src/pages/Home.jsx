import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/notes",
        // const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`,
        {
          title,
          content: "",
        }
      );
      toast.success("Note creted successfully!");
      navigate(`/note/${res.data._id}`);
    } catch (err) {
      console.error("Error creating note:", err);
      toast.error("Failed to create note!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 flex-col">
      <form
        onSubmit={handleCreateNote}
        className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Create a New Note
        </h1>
        <input
          type="text"
          placeholder="Enter note title"
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>

      <Link
        to="/all-notes"
        className="mt-6 bg-indigo-500 px-6 py-2 rounded-full text-white hover:bg-amber-600 transition-all duration-300"
      >
        or view previous notes →
      </Link>
    </div>
  );
};

export default Home;
