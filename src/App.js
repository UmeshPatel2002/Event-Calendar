
import React from 'react';
import CalendarView from './components/CalendarView'

function App() {
  return (
      
        <div className="App">
            <CalendarView/>
        </div>
  );
}

export default App;










// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CalendarView from './components/CalendarView';
// import EventDetails from './components/EventDetails';
// import EventForm from './components/EventForm';
// import { EventProvider } from './context/EventContext';

// const App = () => {
//   return (
//     <EventProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<CalendarView />} />
//           <Route path="/event/:id" element={<EventDetails />} />
//           <Route path="/add" element={<EventForm />} />
//         </Routes>
//       </Router>
//     </EventProvider>
//   );
// };

// export default App;