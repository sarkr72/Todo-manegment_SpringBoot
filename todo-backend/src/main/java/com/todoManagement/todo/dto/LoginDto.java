package com.todoManagement.todo.dto;

public class LoginDto {
    private String usernameOrEmail;
    private String password;

    // No-argument constructor
    public LoginDto() {
    }

    // All-argument constructor
    public LoginDto(String usernameOrEmail, String password) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }

    // Getter for usernameOrEmail
    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    // Setter for usernameOrEmail
    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    // Getter for password
    public String getPassword() {
        return password;
    }

    // Setter for password
    public void setPassword(String password) {
        this.password = password;
    }
}
