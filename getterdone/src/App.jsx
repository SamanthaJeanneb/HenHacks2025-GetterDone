import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDashboardPage from "./pages/TaskDashboard";
import CalendarPage from "./pages/CalendarPage";
import LandingPage from './pages/LandingPage'; // Import the LandingPage


export default function Component() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskDashboardPage />} />
        <Route path="/tasks" element={<TaskDashboardPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
