import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import io from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentNote,
  updateNoteContent,
  setActiveUsers,
} from "../redux/notesSlice";
import DeleteModal from "../components/DeleteModal";

const socket = io(import.meta.env.VITE_SOCKET_URL);

const Editor = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const note = useSelector((state) => state.notes.currentNote);
  const activeUsers = useSelector((state) => state.notes.activeUsers);
  const [lastSaved, setLastSaved] = useState(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // Fetch note from backend
  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}`
      );
      dispatch(setCurrentNote(res.data));
    };
    fetchNote();
  }, [id, dispatch]);

  // Join socket room
  useEffect(() => {
    socket.emit("join_note", id);
  }, [id]);

  // Receive real-time updates
  useEffect(() => {
    socket.on("note_update", (content) => {
      dispatch(updateNoteContent(content));
    });
    return () => {
      socket.off("note_update");
    };
  }, [dispatch]);

  // Active user count
  useEffect(() => {
    socket.on("active_users", (users) => {
      dispatch(setActiveUsers(users));
    });

    return () => {
      socket.off("active_users");
    };
  }, [dispatch]);

  useEffect(() => {
    if (!note) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, {
        content: note.content,
      });
      setLastSaved(new Date().toLocaleTimeString());
    }, 1000);
  }, [note?.content, id]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    dispatch(updateNoteContent(newContent));
    socket.emit("note_update", { noteId: id, content: newContent });
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`);
      toast.success("Note deleted successfully!");
      setShowModal(false);
      navigate("/all-notes");
    } catch (err) {
      console.error("Failed to delete:", err);
      toast.error("Failed to delete note!");
      setShowModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  // const generateName = () => "Anonymous " + Math.floor(Math.random() * 1000);

  const generateName = () => {
    const saved = localStorage.getItem("userName");
    if (saved) return saved;
    const newName = "Anonymous " + Math.floor(Math.random() * 1000);
    localStorage.setItem("userName", newName);
    return newName;
  };

  useEffect(() => {
    const userName = generateName();
    socket.emit("join_note", { noteId: id, userName });
  }, [id]);

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/all-notes")}
            className="font-medium bg-amber-600 px-6 py-2 rounded-[5px] text-white cursor-pointer"
          >
            ⬅ Back to All Notes
          </button>
          <div className="text-sm text-blue-600">
            🔵 {activeUsers.length} active
            <span className="ml-4 text-gray-500">
              (
              {activeUsers.map((user, idx) => (
                <span key={idx}>
                  {user}
                  {idx < activeUsers.length - 1 && ", "}
                </span>
              ))}
              )
            </span>
          </div>
        </div>

        <textarea
          className="w-full h-[60vh] p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          value={note?.content || ""}
          onChange={handleChange}
        />

        <div className="text-sm text-gray-500">
          Last saved: {lastSaved ? lastSaved : "Not saved yet"}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Delete Note
        </button>
      </div>

      {showModal && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Editor;
