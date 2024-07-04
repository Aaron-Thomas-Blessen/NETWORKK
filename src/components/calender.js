import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

// const calStyle = {
//     height: "500px",
//     width: "500px"
// };
const MyCalendar = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      initialDate: '2024-05-01', // Set the initial date to April 1st, 2024
      fixedWeekCount: true,
    });

    calendar.render();

    return () => {
      calendar.destroy(); // Clean up FullCalendar instance
    };
  }, []);

  return <div className="bg-slate-200 rounded-lg overflow-hidden p-2" ref={calendarRef} />;
};

export default MyCalendar;

