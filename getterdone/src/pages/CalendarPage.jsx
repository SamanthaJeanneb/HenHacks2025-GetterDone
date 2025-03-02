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
          setTasks([
            ...fetchedTasks,
            {
              id: "manual-task",
              description: "Manual Task",
              startDate: new Date().toISOString().split("T")[0],
              date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0], // End date set to one week from today
              completed: false,
            },
          ]);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const toggleCompletion = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // Optionally, update the backend with the new completion status
    try {
      const taskToUpdate = updatedTasks.find((task) => task.id === taskId);
      await fetch(`http://localhost:8080/tasks/updateTask/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskToUpdate),
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const events = tasks.map((task) => {
    const startDate = new Date(task.startDate || new Date());
    const endDate = new Date(task.date);
    endDate.setDate(endDate.getDate() + 1); // Include the due date

    return {
      ...task,
      title: task.description,
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
          components={{
            event: (props) => <CustomEvent {...props} toggleCompletion={toggleCompletion} />,
          }}
        />
      </div>
    </div>
  );
}
