import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDashboardPage from "./pages/TaskDashboard";
import CalendarPage from "./pages/CalendarPage";

export default function Component() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskDashboardPage />} />
        <Route path="/tasks" element={<TaskDashboardPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}
