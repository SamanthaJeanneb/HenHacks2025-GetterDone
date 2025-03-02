import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import NavigationBar from "../../components/NavigationBar";
import CustomEvent from "../../components/CustomEvent";

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
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:8080/tasks/getAllTasks");
        if (response.ok) {
          const fetchedTasks = await response.json();
          setTasks(fetchedTasks);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const events = tasks.map((task) => {
    const startDate = new Date(task.startDate || new Date());
    const endDate = new Date(task.date);
    endDate.setDate(endDate.getDate() + 1); // Include the due date

    return {
      ...task,
      title: task.objective,
      start: startDate,
      end: endDate,
    };
  });

  const eventStyleGetter = (event) => {
    const backgroundColor = event.completed ? 'rgba(0, 128, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
    return {
      style: {
        backgroundColor,
        color: 'black',
        borderRadius: '0px',
        opacity: 0.8,
        display: 'block',
        position: 'relative',
      },
    };
  };

  const CustomEventComponent = ({ event }) => (
    <div>
      <span>{event.title}</span>
    </div>
  );

  return (
    <div className="d-flex vh-100 vw-100 flex-column bg-light" style={{ overflow: 'hidden' }}>
      <NavigationBar />
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4 bg-white shadow-sm" style={{ overflow: 'hidden' }}>
        <div style={{ width: '90%', overflow: 'hidden' }}>
          <h1 className="h3 fw-bold">Task Calendar</h1>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700, overflow: 'hidden' }} // Adjusted height to make the calendar taller
            eventPropGetter={eventStyleGetter}
            components={{
              event: CustomEventComponent,
            }}
          />
        </div>
      </div>
    </div>
  );
}
