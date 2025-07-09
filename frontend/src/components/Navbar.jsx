import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-3 shadow mb-4">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          📝 NoteSync
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Create
          </Link>
          <Link to="/all-notes" className="hover:underline">
            All Notes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
