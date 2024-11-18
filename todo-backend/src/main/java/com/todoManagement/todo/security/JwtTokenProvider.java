package com.todoManagement.todo.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app.jwt-expiration-milliseconds}")
    private long jwtExpirationDate;  

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();

        Date currentDate = new Date();

        Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

        Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));

        String token = Jwts.builder()
                .claim("sub", username) 
                .claim("iat", currentDate.getTime()) 
                .claim("exp", expireDate.getTime()) 
                .signWith(key())
                .compact();
        
        return token;
    }
    
    private Key key() {
    	return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }
    
    public String getUsername(String token) {
        // Decode the secret key
        Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));

        Jwts.parser()
        .verifyWith(jwtSecret)
        .build()
        .parseSignedClaims(jwt)
        .getPayload();
    }
}
