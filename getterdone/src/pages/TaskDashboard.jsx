import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatbox from '../../components/Chatbox';
import TaskCard from "../../components/TaskCard";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTaskModal from "../../components/AddTaskModal";
import NavigationBar from "../../components/NavigationBar";
import CategorySidebar from "../../components/CategorySidebar";
import { getAllTasks, createTask } from "../../lib/TaskUtils";

export default function TaskDashboardPage() {
  const [categories, setCategories] = useState(["Work", "Personal"]);
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await getAllTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setIsModalOpen(false);
      navigate("/tasks");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  return (
    <div className="d-flex vh-100 vw-100 flex-column bg-light">
      <NavigationBar />
      
      <div className="d-flex flex-grow-1">
        <CategorySidebar
          categories={categories}
          addCategory={addCategory}
          selectCategory={selectCategory}
          selectedCategory={selectedCategory}
        />

        {/* Main Content */}
        <main className="col p-4 bg-white shadow-sm">
          <h1 className="h3 fw-bold">Task Dashboard</h1>
          {selectedCategory && <h2 className="h5 fw-bold">Category: {selectedCategory}</h2>}
          <button className="btn mb-3" style={{ backgroundColor: "#005c59", color: "white" }} onClick={() => setIsModalOpen(true)}>
            + Add New Task
          </button>
          <Chatbox />
          {/* Current Tasks */}
          <section>
            <h2 className="h5 fw-bold">Current Tasks</h2>
            <div className="row">
              {filteredTasks.filter((task) => !task.completed).map((task) => (
                <TaskCard key={task.id} task={task} toggleCompletion={toggleTaskCompletion} />
              ))}
            </div>
          </section>

          {/* Completed Tasks */}
          <section className="mt-4">
            <h2 className="h5 fw-bold">Completed Tasks</h2>
            <div className="row">
              {filteredTasks.filter((task) => task.completed).map((task) => (
                <TaskCard key={task.id} task={task} toggleCompletion={toggleTaskCompletion} />
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addTask} />
    </div>
  );
}
