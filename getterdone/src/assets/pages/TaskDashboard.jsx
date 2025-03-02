import { useState } from "react";
import TaskCard from "../../../components/TaskCard";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TaskDashboardPage() {
  const [categories, setCategories] = useState(["Work", "Personal"]);
  const [newCategory, setNewCategory] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete UI design", completed: false },
    { id: 2, title: "Fix API bug", completed: true },
  ]);

  const addCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <aside className="col-3 p-4 border-end bg-light">
        <h2 className="h5 fw-bold">Categories</h2>
        <ul className="list-group mb-3">
          {categories.map((category, index) => (
            <li key={index} className="list-group-item">
              {category}
            </li>
          ))}
        </ul>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
          />
          <button className="btn btn-primary" onClick={addCategory}>
            +
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="col p-4">
        <h1 className="h3 fw-bold">Task Dashboard</h1>
        <button className="btn btn-success mb-3">+ Add New Task</button>

        {/* Current Tasks */}
        <section>
          <h2 className="h5 fw-bold">Current Tasks</h2>
          <div className="row">
            {tasks.filter((task) => !task.completed).map((task) => (
              <TaskCard key={task.id} task={task} toggleCompletion={toggleTaskCompletion} />
            ))}
          </div>
        </section>

        {/* Completed Tasks */}
        <section className="mt-4">
          <h2 className="h5 fw-bold">Completed Tasks</h2>
          <div className="row">
            {tasks.filter((task) => task.completed).map((task) => (
              <TaskCard key={task.id} task={task} toggleCompletion={toggleTaskCompletion} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
