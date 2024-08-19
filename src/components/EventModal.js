import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';

const EventModal = ({ event, onClose, onEdit }) => {
  const { deleteEvent } = useContext(EventContext);

  const handleDelete = () => {
    deleteEvent(event.id);
    onClose(); // Close the modal after deleting the event
  };

  const handleEdit = () => {
    onEdit(event); // Trigger the edit function with the event data
    onClose(); // Close the modal before opening the form
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="mb-4">{event.description}</p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
