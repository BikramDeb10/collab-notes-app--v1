// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import AllNotes from "./components/AllNotes";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-notes" element={<AllNotes />} />
        <Route path="/note/:id" element={<Editor />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        hideProgressBar={false}
        theme="light"
      />
    </div>
  );
};

export default App;
