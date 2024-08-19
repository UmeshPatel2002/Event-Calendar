import React, { useState, useContext, useMemo } from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventContext } from '../context/EventContext';
import EventForm from './EventForm';
import EventModal from './EventModal';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { events } = useContext(EventContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Filter states
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDate, setFilterDate] = useState('All');

  const handleSelectSlot = (slotInfo) => {
    // const now = new Date();
    const selectedDate = slotInfo.start;
    // const isWithinMonth = now.getFullYear() === selectedDate.getFullYear() && now.getMonth() === selectedDate.getMonth();

    // if (isWithinMonth) {
      setSelectedDate(selectedDate);
      setSelectedEvent(null);
      setShowForm(true);
    // }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleCategoryFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  // Memoize filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const now = new Date();
      const eventDate = new Date(event.start);

      // Filter by category
      const categoryMatch =
        filterCategory === 'All' || event.category === filterCategory;

      // Filter by date
      const dateMatch =
        filterDate === 'All' ||
        (filterDate === 'Upcoming' && eventDate >= now) ||
        (filterDate === 'Passed' && eventDate < now);

      return categoryMatch && dateMatch;
    });
  }, [events, filterCategory, filterDate]);

  return (
    <div className="calendar-container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8">
        {/* Calendar header with filters */}
        <h1 className='text-center text-2xl sm:text-4xl mb-4 font-bold text-orange-400'><span>Calendar</span></h1>
        <div className="flex justify-center md:justify-end mb-4">
          {/* <div className="flex-1"> */}
            {/* Calendar header title */}
            {/* <div className="text-lg font-semibold">Calendar</div> */}
          {/* </div> */}
          <div className="flex space-x-4">
            {/* Filters */}
            <select
              value={filterCategory}
              onChange={handleCategoryFilterChange}
              className="p-2  border rounded text-[14px] sm:text-[18px]"
            >
              <option value="All" className='text-[14px] sm:text-[18px]'>All Categories</option>
              <option value="Work" className='text-[14px] sm:text-[18px]'>Work</option>
              <option value="Personal" className='text-[14px] sm:text-[18px]'>Personal</option>
            </select>
            <select
              value={filterDate}
              onChange={handleDateFilterChange}
              className="p-2 border rounded text-[14px] sm:text-[18px]"
            >
              <option value="All" className='text-[14px] sm:text-[18px]'>All Dates</option>
              <option value="Upcoming" className='text-[14px] sm:text-[18px]'>Upcoming</option>
              <option value="Passed" className='text-[14px] sm:text-[18px]'>Passed</option>
            </select>
          </div>
        </div>

        <Calendar
          localizer={localizer}
          events={filteredEvents}
          views={['month']}
          selectable={true}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelectSlot}
          longPressThreshold={1}
          onSelectEvent={handleSelectEvent}
          style={{ height: '80vh' }}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <EventForm
              selectedDate={selectedDate}
              existingEvent={selectedEvent}
              onClose={closeForm}
            />
          </div>
        </div>
      )}

      {showModal && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={closeModal}
          onEdit={handleEditEvent}
        />
      )}
    </div>
  );
};

export default CalendarView;