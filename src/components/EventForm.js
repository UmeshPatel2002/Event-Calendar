import React, { useState, useEffect, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import moment from 'moment';

const EventForm = ({ selectedDate, existingEvent, onClose }) => {
  const { addEvent, editEvent } = useContext(EventContext);

  // State for form fields
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Work');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (existingEvent) {
      setTitle(existingEvent.title);
      setDate(existingEvent.start.toISOString().split('T')[0]); // Correct format for the date input
      setCategory(existingEvent.category || 'Work');
      setDescription(existingEvent.description || '');
    } else {
      setTitle('');
      setDate(selectedDate ? formatDate(selectedDate) : '');
      setCategory('Work');
      setDescription('');
    }
  }, [existingEvent, selectedDate]);

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      id: existingEvent ? existingEvent.id : Date.now(),
      title,
      start: new Date(date),
      end: new Date(date),
      category,
      description,
    };
    if (existingEvent) {
      editEvent(event); // Edit existing event
    } else {
      addEvent(event); // Add new event
    }
    onClose();
  };

  return (
    <div className="relative p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <form onSubmit={handleSubmit} className="pt-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          required
          className="mb-2 p-2 border rounded w-full text-base md:text-lg lg:text-xl"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mb-2 p-2 border rounded w-full text-base md:text-lg lg:text-xl"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-2 p-2 border rounded w-full text-base md:text-lg lg:text-xl"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="mb-2 p-2 border rounded w-full text-base md:text-lg lg:text-xl"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full text-base md:text-lg lg:text-xl">
          {existingEvent ? 'Update Event' : 'Add Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
