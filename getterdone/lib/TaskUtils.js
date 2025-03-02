
const BASE_URL = "http://localhost:8080/tasks";

// Function to create a new task
export async function createTask(task) {
  const response = await fetch(`${BASE_URL}/createTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
}

// Function to get all tasks
export async function getAllTasks() {
  const response = await fetch(`${BASE_URL}/getAllTasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}
