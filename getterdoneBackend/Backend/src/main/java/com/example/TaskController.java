package com.example;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    // Temporary in-memory storage for tasks (you can switch to DB if needed)
    private List<Task> taskList = new ArrayList<>();

    @PostMapping("/createTask")
    public Task createTask(@RequestBody TaskDTO taskDTO) {
        // Convert TaskDTO to Task object
        Task newTask = new Task(taskDTO.getPriority(), taskDTO.getDate(), taskDTO.getCategory(), taskDTO.getDescription());

        // Optionally set completion status (false by default in constructor)
        taskList.add(newTask);
        return newTask;
    }

    // Method to retrieve all tasks
    @GetMapping("/getAllTasks")
    public List<Task> getAllTasks() {
        return taskList;
    }
}
