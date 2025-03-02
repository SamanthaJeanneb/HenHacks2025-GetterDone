package com.example;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {


    // Temporary in-memory storage for tasks (you can switch to DB if needed)
    private List<Task> taskList = new ArrayList<>();

    

    @PostMapping("/createTask")
    public Task createTask(@RequestBody TaskDTO taskDTO) {
        // Convert TaskDTO to Task object
        Task newTask = new Task(taskDTO.getPriority(), taskDTO.getDate(), taskDTO.getCategory(), taskDTO.getObjective());

        // Optionally set completion status (false by default in constructor)
        taskList.add(newTask);
        System.out.println("Task added");
        return newTask;
    }




    @PostMapping("/populateSubTasks")
    public List<SubTask> populateSubTasks(@RequestBody SubTaskDTO subtaskDTO) {

        String allSubObjectives = subtaskDTO.getSubobjectives();
        String[] arr = allSubObjectives.split(";");

        String mainObjective = subtaskDTO.getObjective();

        int counter = 0;
        int taskRef = 0;
        //by default, if the task is not found, then the subtasks get stored
        //in the task at the start of the list.

        for (Task task : taskList) {

            if (task.getObjective().equals(mainObjective)) {
                taskRef = counter;
            }
            else {
                counter++;
            }
        }

        for (String str : arr) {
            taskList.get(taskRef).populateSubTasks(str);
        }
        return taskList.get(taskRef).getSubTasks();
    }

    // Method to retrieve all subtasks of a particular task
    @GetMapping("/getAllSubTasks")
    public List<SubTask> getAllSubTasks(@RequestBody TaskDTO taskDTO) {

        int counter = 0;
        int taskRef = 0; //once again. returns what's in task 0 if no match.
        String mainObjective = taskDTO.getObjective();

        for (Task task : taskList) {

            if (task.getObjective().equals(mainObjective)) {
                taskRef = counter;
            }
            else {
                counter++;
            }
        }

        return taskList.get(taskRef).getSubTasks();
    }

    // Method to retrieve all tasks
    @GetMapping("/getAllTasks")
    public List<Task> getAllTasks() {
        return taskList;
    }
}
