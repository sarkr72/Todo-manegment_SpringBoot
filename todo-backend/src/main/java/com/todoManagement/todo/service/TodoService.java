package com.todoManagement.todo.service;


import java.util.List;

import com.todoManagement.todo.dto.TodoDto;
import com.todoManagement.todo.entity.Todo;


public interface TodoService {

    TodoDto addTodo(TodoDto todo);

    TodoDto getTodo(Long id);

    List<TodoDto> getAllTodos();

    TodoDto updateTodo(Long id, TodoDto todo);

    void deleteTodo(Long id);

    TodoDto completeTodo(Long id);

    TodoDto inCompleteTodo(Long id);
}
