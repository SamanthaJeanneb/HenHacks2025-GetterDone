package com.example;
import java.util.Date;

public class Task {

    private int priority;
    private Date date;
    private String category;
    private String description;
    private boolean completed;


    public Task(int priority, Date date, String category, String description) {
        this.priority = priority;
        this.date = date;
        this.category = category;
        this.description = description;
        this.completed = false;
    }


    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public int getPriority() {
        return priority;
    }

    public Date getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}