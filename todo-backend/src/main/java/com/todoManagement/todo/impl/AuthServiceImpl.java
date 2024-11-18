package com.todoManagement.todo.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.todoManagement.todo.dto.LoginDto;
import com.todoManagement.todo.dto.RegisterDto;
import com.todoManagement.todo.entity.Role;
import com.todoManagement.todo.entity.User;
import com.todoManagement.todo.exception.TodoAPIException;
import com.todoManagement.todo.repository.RoleRepository;
import com.todoManagement.todo.repository.UserRepository;
import com.todoManagement.todo.service.AuthService;


@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
    private UserRepository userRepository;
	
	@Autowired
    private RoleRepository roleRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
    private AuthenticationManager authenticationManager;
//    private JwtTokenProvider jwtTokenProvider;

    // Constructor with all dependencies
//    public AuthServiceImpl(UserRepository userRepository,
//                           RoleRepository roleRepository,
//                           PasswordEncoder passwordEncoder,
//                           AuthenticationManager authenticationManager,
//                           JwtTokenProvider jwtTokenProvider) {
//        this.userRepository = userRepository;
//        this.roleRepository = roleRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.authenticationManager = authenticationManager;
//        this.jwtTokenProvider = jwtTokenProvider;
//    }

    @Override
    public String register(RegisterDto registerDto) {

        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Username already exists!");
        }

        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!.");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);

        return "User Registered Successfully!.";
    }

	@Override
	public String login(LoginDto loginDto) {
		
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginDto.getUsernameOrEmail(),
				loginDto.getPassword()
				));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		return "User logged-in successfully";
	}




//    @Override
//    public JwtAuthResponse login(LoginDto loginDto) {
//
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
//                loginDto.getUsernameOrEmail(),
//                loginDto.getPassword()
//        ));
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        String token = jwtTokenProvider.generateToken(authentication);
//
//        Optional<User> userOptional = userRepository.findByuserNameOrEmail(loginDto.getUsernameOrEmail(),
//                loginDto.getUsernameOrEmail());
//
//        String role = null;
//        if(userOptional.isPresent()){
//            User loggedInUser = userOptional.get();
//            Optional<Role> optionalRole = loggedInUser.getRoles().stream().findFirst();
//
//            if(optionalRole.isPresent()){
//                Role userRole = optionalRole.get();
//                role = userRole.getName();
//            }
//        }
//
//        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
//        jwtAuthResponse.setRole(role);
//        jwtAuthResponse.setAccessToken(token);
//        return jwtAuthResponse;
//    }
}
