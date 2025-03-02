import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from '../src/context/Context';

export default function AddTaskModal({ isOpen, onClose, onSave }) {
  const [taskDescription, setTaskDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { input, setInput, onSent, suggestedSubtasks } = useContext(Context);

  const handleSave = () => {
    if (taskDescription && category && priority && dueDate) {
      const priorityMap = { Low: 1, Medium: 2, High: 3 };
      const newTask = { description: taskDescription, category, priority: priorityMap[priority], date: dueDate };
      console.log("New task:", newTask); // Debug log
      onSave(newTask);
      setTaskDescription("");
      setCategory("");
      setPriority("");
      setDueDate("");
      onClose();
    }
  };

  const handleSuggestSubtasks = () => {
    onSent(taskDescription + "actually, dont answer in 1 sentence. instead answer three responses of 6 words or less seperated by a ; that explain the steps I would need to take to complete this task.", true);
  };

  return (
    isOpen && (
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Task</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Task Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Enter task description"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select category</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="">Select priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <button onClick={handleSuggestSubtasks}>Suggest Subtasks</button>
              {suggestedSubtasks.length > 0 && (
                <div>
                  {suggestedSubtasks.map((subtask, index) => (
                    <div key={index} className="form-check">
                      <input className="form-check-input" type="checkbox" id={`subtask-${index}`} />
                      <label className="form-check-label" htmlFor={`subtask-${index}`}>
                        {subtask}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="button" className="btn btn-primary" style={{ backgroundColor: "#005c59", borderColor: "#005c59" }} onClick={handleSave} disabled={!taskDescription || !category || !priority || !dueDate}>
                Save Task
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
