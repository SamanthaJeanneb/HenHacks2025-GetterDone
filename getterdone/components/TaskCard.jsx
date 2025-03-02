import { useState } from "react";

export default function TaskCard({ task, toggleCompletion }) {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const addSubtask = () => {
    if (newSubtask.trim() !== "") {
      setSubtasks([...subtasks, { id: subtasks.length + 1, title: newSubtask, completed: false }]);
      setNewSubtask("");
    }
  };

  const toggleSubtaskCompletion = (id) => {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, completed: !subtask.completed } : subtask
      )
    );
  };

  return (
    <div className="col-md-6">
      <div className={`card p-3 mb-3 ${task.completed ? "bg-secondary text-white" : ""}`}>
        <div className="d-flex justify-content-between align-items-center">
          <span className={`h6 ${task.completed ? "text-decoration-line-through" : ""}`}>
            {task.title}
          </span>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-primary" onClick={() => toggleCompletion(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {isDropdownOpen ? "▲" : "▼"}
            </button>
          </div>
        </div>

        {isDropdownOpen && (
          <div className="mt-3">
            <h6>Subtasks</h6>
            <ul className="list-group">
              {subtasks.map((subtask) => (
                <li key={subtask.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span className={subtask.completed ? "text-decoration-line-through" : ""}>{subtask.title}</span>
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
              <button className="btn btn-primary" onClick={addSubtask}>+</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
