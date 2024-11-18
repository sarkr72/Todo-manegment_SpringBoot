package com.todoManagement.todo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.todoManagement.todo.entity.Todo;


public interface TodoRepository extends JpaRepository<Todo, Long> {

}
