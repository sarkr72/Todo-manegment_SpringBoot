package com.todoManagement.todo.exception;

import org.springframework.http.HttpStatus;

public class TodoAPIException extends RuntimeException {

    private HttpStatus status;
    private String message;

    // Constructor with HttpStatus and message
    public TodoAPIException(HttpStatus status, String message) {
        super(message); // Pass the message to the superclass (RuntimeException)
        this.status = status;
        this.message = message;
    }

    // Getter for status
    public HttpStatus getStatus() {
        return status;
    }

    // Setter for status
    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    // Getter for message
    public String getMessage() {
        return message;
    }

    // Setter for message
    public void setMessage(String message) {
        this.message = message;
    }
}
