package com.todoManagement.todo.dto;

public class TodoDto {

    private Long id;
    private String title;
    private String description;
    private boolean completed;

    // No-argument constructor
    public TodoDto() {
    }

    // All-argument constructor
    public TodoDto(Long id, String title, String description, boolean completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for title
    public String getTitle() {
        return title;
    }

    // Setter for title
    public void setTitle(String title) {
        this.title = title;
    }

    // Getter for description
    public String getDescription() {
        return description;
    }

    // Setter for description
    public void setDescription(String description) {
        this.description = description;
    }

    // Getter for completed
    public boolean isCompleted() {
        return completed;
    }

    // Setter for completed
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
