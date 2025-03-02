package com.example;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {





    // Temporary in-memory storage for tasks (you can switch to DB if needed)
    private List<Task> taskList = new ArrayList<>();





    //functionality for creating tasks
    @PostMapping("/createTask")
    public Task createTask(@RequestBody TaskDTO taskDTO) {
        // Convert TaskDTO to Task object
        Task newTask = new Task(taskDTO.getPriority(), taskDTO.getDate(), taskDTO.getCategory(), taskDTO.getObjective());

        // Optionally set completion status (false by default in constructor)
        taskList.add(newTask);
        System.out.println("Task added");
        return newTask;
    }




    @PostMapping("/changeTask")
    public void changeTask(@RequestBody TaskDTO taskDTO) {

        String objective = taskDTO.getObjective();
        String newObjective = taskDTO.getProposedChange();

        int counter = 0;

        for (Task task : taskList) {
            if (task.getObjective().equals(objective)) {
                taskList.get(counter).setObjective(newObjective);
            }
            else {
                counter++;
            }
        }
        System.out.println("Task updated");
    }



    //functionality for removing tasks
    @PostMapping("/deleteTask")
    public String deleteTask(@RequestBody TaskDTO taskDTO) {
        // Convert TaskDTO to Task object
        String objectiveRef = taskDTO.getObjective();

        for (Task task : taskList) {
            if (task.getObjective().equals(objectiveRef)) {
                taskList.remove(task);
            }
        }
        return "done. " + objectiveRef + " task deleted";
    }





    //method to add a ton of subtasks to a task
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




    @PostMapping("/changeSubTask")
    public void changeSubTask(@RequestBody SubTaskDTO subTaskDTO) {

        String objective = subTaskDTO.getObjective();
        String subObjective = subTaskDTO.getSubobjectives();
        String newSubObjective = subTaskDTO.getProposedSubObjective();

        int counter = 0;
        int taskRef = 0; //default is 0 once again

        for (Task task : taskList) {
            if (task.getObjective().equals(objective)) {
                taskRef = counter;
            }
            else {
                counter++;
            }
        }

        counter = 0;

        for (SubTask task : taskList.get(taskRef).getSubTasks()) {
            if (task.getSubObjective().equals(subObjective)){
                taskList.get(taskRef).getSubTasks().get(counter).setSubObjective(newSubObjective);
            }
            else {
                counter++;
            }
        }

        System.out.println("Subtask updated");
    }



    //functionality for removing subtasks allocated to tasks in the subtask arraylist
    @PostMapping("/deleteSubTask")
    public String deleteSubTask(@RequestBody SubTaskDTO subtaskDTO) {

        String mainObjective = subtaskDTO.getObjective();
        String subObjective = subtaskDTO.getSubobjectives();
        //^^^name of getter is MISLEADING. there is only supposed to be ONE subobjective
        //passed as an argument here, where in populateSubTasks, it's several.
        int counter = 0;
        int taskRef = 0; //once again, default is 0.

        for (Task task : taskList) {
            if (task.getObjective().equals(mainObjective)) {
                taskRef = counter;
            }
            else {
                counter++;
            }
        }

        taskList.get(taskRef).removeSubTask(subObjective);

        return "done. " + subObjective + " subtask deleted";
    }



    // Method to retrieve a subtask
    @GetMapping("/getSubTask")
    public SubTask getSubTask(@RequestBody TaskDTO taskDTO) {

        String objective = taskDTO.getObjective();
        SubTask theSubTask = new SubTask("null", "null");

        for (Task task : taskList) {
            for (SubTask subTask : task.getSubTasks()) {
                if (subTask.getSubObjective().equals(objective)) {
                    theSubTask = subTask;
                }
            }
        }
        return theSubTask;
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
