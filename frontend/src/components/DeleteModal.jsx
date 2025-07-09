import React from "react";

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
        <p className="mb-6 text-gray-600">
          Do you really want to delete this note? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Confirm Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Not Sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
