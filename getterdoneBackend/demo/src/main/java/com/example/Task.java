package com.example;
import java.util.Date;

public class Task {

    private int priority;
    private Date date;
    private String Category;
    private boolean isComplete;


    Task(int p, Date d, String c) {
        priority = p;
        date = d;
        Category = c;
        isComplete = false;

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