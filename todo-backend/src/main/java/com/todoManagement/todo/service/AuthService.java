package com.todoManagement.todo.service;

import com.todoManagement.todo.dto.LoginDto;
import com.todoManagement.todo.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    String login(LoginDto loginDto);
}
