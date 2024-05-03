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
      // events: [
      //   { title: 'Event 1', date: '2024-04-01' },
      //   { title: 'Event 2', date: '2024-04-05' },
      //   { title: 'Event 3', date: '2024-04-10' },
      // ],
    });

    calendar.render();

    return () => {
      calendar.destroy(); // Clean up FullCalendar instance
    };
  }, []);

  return <div className="bg-slate-200 rounded-lg overflow-hidden p-2" ref={calendarRef} />;
};

export default MyCalendar;

