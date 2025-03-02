import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import NavigationBar from "../../components/NavigationBar";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from local storage or API
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const events = tasks.map((task) => {
    const startDate = new Date();
    const endDate = new Date(task.dueDate);
    const progressPercentage = task.completed ? 100 : 0; // Assuming task.completed is a boolean

    return {
      title: task.title,
      start: startDate,
      end: endDate,
      progressPercentage,
    };
  });

  const eventStyleGetter = (event) => {
    const backgroundColor = `rgba(0, 0, 0, ${event.progressPercentage / 100})`;
    return {
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <div className="d-flex vh-100 vw-100 flex-column bg-light">
      <NavigationBar />
      <div className="flex-grow-1 p-4 bg-white shadow-sm">
        <h1 className="h3 fw-bold">Task Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
}
