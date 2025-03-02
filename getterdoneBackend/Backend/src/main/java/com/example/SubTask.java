package com.example;


public class SubTask {
    private String objective;
    private String subObjective;
    private boolean isComplete;

    SubTask(String object, String object2) {
        isComplete = false;
        objective = object;
        subObjective = object2;
    }


    public String getSubObjective() {
        return subObjective;
    }

    public String getObjective() {
        return objective;
    }

}
