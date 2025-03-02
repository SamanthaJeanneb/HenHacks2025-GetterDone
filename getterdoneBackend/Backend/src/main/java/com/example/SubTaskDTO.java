package com.example;

public class SubTaskDTO {

    private String objective;
    private String subobjectives;
    private String proposedSubObjective;

    // Getters and setters


    public void setProposedSubObjective(String proposedSubObjective) {
        this.proposedSubObjective = proposedSubObjective;
    }

    public String getProposedSubObjective() {
        return proposedSubObjective;
    }

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
