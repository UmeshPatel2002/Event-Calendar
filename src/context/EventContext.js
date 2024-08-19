
import React, { createContext, useState, useEffect } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // Retrieve events from local storage or initialize with default events
  const loadEvents = () => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [
      {
        id: 1,
        title: 'Meeting',
        start: new Date(2024, 7, 17, 10, 0), // Aug 17, 2024, 10:00 AM
        end: new Date(2024, 7, 17, 12, 0), // Aug 17, 2024, 12:00 PM
      },
      {
        id: 2,
        title: 'Lunch',
        start: new Date(2024, 8, 18, 13, 0), // Aug 18, 2024, 1:00 PM
        end: new Date(2024, 9, 18, 14, 0), // Aug 18, 2024, 2:00 PM
      },
    ];
  };

  const [events, setEvents] = useState(loadEvents);

  useEffect(() => {
    // Save events to local storage whenever events change
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const editEvent = (updatedEvent) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
