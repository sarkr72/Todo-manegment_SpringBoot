package com.todoManagement.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todoManagement.todo.dto.TodoDto;
import com.todoManagement.todo.service.TodoService;



@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
public class TodoController {

	@Autowired
    private TodoService todoService;

	 @PreAuthorize("hasRole('ADMIN')")
	    @PostMapping
	    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto){
	        TodoDto savedTodo = todoService.addTodo(todoDto);
	        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
	    }

	    @PreAuthorize("hasAnyRole('ADMIN','USER')")
	    @GetMapping("{id}")
	    public ResponseEntity<TodoDto> getTodo(@PathVariable("id") Long todoId){
	        TodoDto todoDto = todoService.getTodo(todoId);
	        return new ResponseEntity<>(todoDto, HttpStatus.OK);
	    }

	    @PreAuthorize("hasAnyRole('ADMIN','USER')")
	    @GetMapping
	    public ResponseEntity<List<TodoDto>> getAllTodos(){
	        List<TodoDto> todos = todoService.getAllTodos();
	        return new ResponseEntity<>(todos, HttpStatus.OK);
//	        return ResponseEntity.ok(todos);
	    }

	    @PreAuthorize("hasRole('ADMIN')")
	    @PutMapping("{id}")
	    public ResponseEntity<TodoDto> updateTodo(@PathVariable("id") Long todoId, @RequestBody TodoDto todoDto){
	        TodoDto updatedTodo = todoService.updateTodo( todoId, todoDto);
	        return ResponseEntity.ok(updatedTodo);
	    }

	    @PreAuthorize("hasRole('ADMIN')")
	    @DeleteMapping("{id}")
	    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long todoId){
	        todoService.deleteTodo(todoId);
	        return ResponseEntity.ok("Todo deleted successfully!.");
	    }

	    @PreAuthorize("hasAnyRole('ADMIN','USER')")
	    @PatchMapping("{id}/complete")
	    public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") Long todoId){
	        TodoDto updatedTodo = todoService.completeTodo(todoId);
	        return ResponseEntity.ok(updatedTodo);
	    }

	    @PreAuthorize("hasAnyRole('ADMIN','USER')")
	    @PatchMapping("{id}/in-complete")
	    public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable("id") Long todoId){
	        TodoDto updatedTodo = todoService.inCompleteTodo(todoId);
	        return ResponseEntity.ok(updatedTodo);
	    }

	}