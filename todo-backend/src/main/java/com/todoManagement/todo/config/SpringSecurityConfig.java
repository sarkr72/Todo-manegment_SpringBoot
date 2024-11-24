package com.todoManagement.todo.config;


import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.session.HttpSessionEventPublisher;


@Configuration
@EnableMethodSecurity
public class SpringSecurityConfig {

	@Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public Session session() {
//        Session session = new Session();
//        session.setTimeout(Duration.ofMinutes(15)); // Set timeout to 15 minutes
//        return session;
//    }
    
//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//       http.csrf((csrf) -> csrf.disable()).authorizeRequests((authorize) -> {authorize.anyRequest().authenticated();
//       }).httpBasic(Customizer.withDefaults());

//        http.csrf((csrf) -> csrf.disable())
//        	.authorizeRequests((authorize) -> {
//            authorize.requestMatchers(HttpMethod.POST, "/api/**").hasRole("ADMIN");
//            authorize.requestMatchers(HttpMethod.PUT, "/api/**").hasRole("ADMIN");
//            authorize.requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN");
//            authorize.requestMatchers(HttpMethod.GET, "/api/**").hasAnyRole("ADMIN", "USER");
//            authorize.requestMatchers(HttpMethod.PATCH, "/api/**").hasAnyRole("ADMIN", "USER");
//        	  authorize.requestMatchers(HttpMethod.GET, "/api/**").permitAll();
//              authorize.anyRequest().authenticated();
//        }).httpBasic(Customizer.withDefaults());
//
//        return http.build();
//    }

    
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authorize -> {
//                authorize.requestMatchers(HttpMethod.GET, "/api/**").permitAll(); // Allow all GET requests to /api/**
                authorize.requestMatchers("/api/auth/**").permitAll();
            	authorize.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                authorize.anyRequest().authenticated(); // Require authentication for all other requests
            }).httpBasic(Customizer.withDefaults())
            .sessionManagement(session -> session
            		.sessionFixation().migrateSession()
            		.maximumSessions(1)
            		.expiredUrl("/api/auth/session-expired")
            		);

        return http.build();
    }

    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher(); // Ensures session events are published
    }
    
//    @Bean
//    public UserDetailsService userDetailsService() {
//        UserDetails rinku = User.builder()
//                .username("rinku")
//                .password(passwordEncoder().encode("password"))
//                .roles("USER")
//                .build();
//
//        UserDetails admin = User.builder()
//                .username("admin")
//                .password(passwordEncoder().encode("admin"))
//                .roles("ADMIN")
//                .build();
//
//        return new InMemoryUserDetailsManager(rinku, admin);
//    }
}
