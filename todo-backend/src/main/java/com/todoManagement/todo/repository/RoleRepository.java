package com.todoManagement.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todoManagement.todo.entity.Role;



public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findByName(String name);
	
	
}
