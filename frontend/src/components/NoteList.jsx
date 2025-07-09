import { Link } from "react-router-dom";

const NoteList = ({ notes }) => {
  if (!notes.length) {
    return <p className="text-gray-500">No notes found.</p>;
  }

  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <Link
          key={note._id}
          to={`/note/${note._id}`}
          className="block p-4 bg-white rounded shadow hover:bg-blue-50 transition"
        >
          <h3 className="font-semibold text-lg">{note.title}</h3>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(note.updatedAt).toLocaleString()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default NoteList;
