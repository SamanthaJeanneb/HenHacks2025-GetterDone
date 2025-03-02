package com.example;
import java.util.ArrayList;
import java.util.Date;

public class Task {

    private String objective;
    private int priority;
    private Date date;
    private String Category;
    private boolean isComplete;
    private ArrayList<SubTask> subTasks = new ArrayList<SubTask>();
    private int percentDone = 0;



    Task(int p, Date d, String c, String object) {
        priority = p;
        date = d;
        Category = c;
        objective = object;
        isComplete = false;

    }


    public void removeSubTask(String subObjective) {
        int counter = 0;

        for (SubTask task : subTasks) {
            if (task.getSubObjective().equals(subObjective)) {
                subTasks.remove(subTasks.get(counter));
            }
            else {
                counter++;
            }
        }
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public String getObjective() {
        return objective;
    }

    public void populateSubTasks(String subObjective) {
        subTasks.add(new SubTask(objective, subObjective));
    }

    public ArrayList<SubTask> getSubTasks() {
        return subTasks;
    }

    public boolean checkCompleted() {
        return isComplete;
    }

    public void complete() {

        isComplete = true;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setCategory(String category) {
        Category = category;
    }



    public String getCategory() {
        return Category;
    }

    public int getPriority() {
        return priority;
    }

    public Date getDate() {
        return date;
    }
}