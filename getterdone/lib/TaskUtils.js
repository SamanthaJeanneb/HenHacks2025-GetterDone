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

// Function to delete a task
export async function deleteTask(task) {
  const response = await fetch(`${BASE_URL}/deleteTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
}

// Function to populate subtasks
export async function populateSubTasks(subtaskDTO) {
  const response = await fetch(`${BASE_URL}/populateSubTasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subtaskDTO),
  });

  if (!response.ok) {
    throw new Error("Failed to populate subtasks");
  }

  return response.json();
}

// Function to delete a subtask
export async function deleteSubTask(subtaskDTO) {
  const response = await fetch(`${BASE_URL}/deleteSubTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subtaskDTO),
  });

  if (!response.ok) {
    throw new Error("Failed to delete subtask");
  }

  return response.json();
}

// Function to get all subtasks of a particular task
export async function getAllSubTasks(taskDTO) {
  const response = await fetch(`${BASE_URL}/getAllSubTasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskDTO),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch subtasks");
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
