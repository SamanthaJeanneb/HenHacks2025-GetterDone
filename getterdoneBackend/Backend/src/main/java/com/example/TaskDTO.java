package com.example;

import java.util.Date;

public class TaskDTO {

    private String objective;
    private int priority;
    private Date date;
    private String category;
    private String proposedChange;

    // Getters and setters


    public void setProposedChange(String proposedChange) {
        this.proposedChange = proposedChange;
    }

    public String getProposedChange() {
        return proposedChange;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public String getObjective() {
        return objective;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
