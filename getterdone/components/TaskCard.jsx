import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TaskCard({ task, toggleCompletion }) {
  const [subtasks, setSubtasks] = useState(() => {
    const savedSubtasks = localStorage.getItem(`subtasks-${task.id}`);
    return savedSubtasks ? JSON.parse(savedSubtasks) : [];
  });
  const [newSubtask, setNewSubtask] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const addSubtask = () => {
    if (newSubtask.trim() !== "") {
      const updatedSubtasks = [...subtasks, { id: subtasks.length + 1, title: newSubtask, completed: false }];
      setSubtasks(updatedSubtasks);
      localStorage.setItem(`subtasks-${task.id}`, JSON.stringify(updatedSubtasks));
      setNewSubtask("");
    }
  };

  const toggleSubtaskCompletion = (id) => {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, completed: !subtask.completed } : subtask
    );
    setSubtasks(updatedSubtasks);
    localStorage.setItem(`subtasks-${task.id}`, JSON.stringify(updatedSubtasks));
  };

  const deleteSubtask = (id) => {
    const updatedSubtasks = subtasks.filter((subtask) => subtask.id !== id);
    setSubtasks(updatedSubtasks);
    localStorage.setItem(`subtasks-${task.id}`, JSON.stringify(updatedSubtasks));
  };

  const completedSubtasks = subtasks.filter((subtask) => subtask.completed).length;
  const progressPercentage = subtasks.length > 0 ? (completedSubtasks / subtasks.length) * 100 : 0;

  return (
    <div className="col-md-6">
      <div className={`card p-3 mb-3 ${task.completed ? "bg-light text-dark" : "bg-white text-dark"} shadow-sm`}>
        <div className="d-flex justify-content-between align-items-center">
          <span className={`h6 ${task.completed ? "text-decoration-line-through" : ""}`}>
            {task.title}
          </span>
          <div className="d-flex gap-2">
            <button className="btn btn-sm" style={{ backgroundColor: "#005c59", color: "white" }} onClick={() => toggleCompletion(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {isDropdownOpen ? "▲" : "▼"}
            </button>
          </div>
        </div>
        <div className="mt-2">
          <small>Due by: {task.dueDate}</small>
        </div>
        <div className="mt-2">
          <small>Progress: {Math.round(progressPercentage)}%</small>
        </div>

        {isDropdownOpen && (
          <div className="mt-3">
            <h6>Subtasks</h6>
            <div className="progress mb-2">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressPercentage}%` }}
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Math.round(progressPercentage)}%
              </div>
            </div>
            <ul className="list-group">
              {subtasks.map((subtask) => (
                <li key={subtask.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-outline-danger me-2" onClick={() => deleteSubtask(subtask.id)}>
                      &times;
                    </button>
                    <span className={subtask.completed ? "text-decoration-line-through" : ""}>{subtask.title}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => toggleSubtaskCompletion(subtask.id)}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-2 d-flex">
              <input
                type="text"
                className="form-control me-2"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="New subtask"
              />
              <button className="btn btn-primary" style={{ backgroundColor: "#005c59", borderColor: "#005c59" }} onClick={addSubtask}>+</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
