package com.example;

public class SubTaskDTO {

    private String objective;
    private String subobjectives;

    // Getters and setters

    public void setSubobjectives(String subobjectives) {
        this.subobjectives = subobjectives;
    }

    public String getSubobjectives() {
        return subobjectives;
    }

    public String getObjective() {
        return objective;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

}
