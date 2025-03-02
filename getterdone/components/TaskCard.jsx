export default function TaskCard({ task, toggleCompletion }) {
    return (
      <div className="col-md-6">
        <div className={`card p-3 mb-3 ${task.completed ? "bg-secondary text-white" : ""}`}>
          <div className="d-flex justify-content-between align-items-center">
            <span className={`h6 ${task.completed ? "text-decoration-line-through" : ""}`}>
              {task.title}
            </span>
            <button className="btn btn-sm btn-outline-primary" onClick={() => toggleCompletion(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  