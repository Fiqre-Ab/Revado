package com.revado.service;

import com.revado.entity.User;
import com.revado.exception.AuthFail;
import com.revado.exception.LoginFail;
import com.revado.repository.UserRepository;
import com.revado.utility.JwtUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtility jwtUtility;

    public Map<String, String> validateCredentials(User credentials) {

        if (credentials == null || credentials.getEmail() == null || credentials.getPassword() == null) {
            throw new LoginFail("Email and password are required");
        }

        User user = userRepo.findByEmail(credentials.getEmail())
                .orElseThrow(() -> new LoginFail("Invalid email/ passwords"));

        if (!passwordEncoder.matches(credentials.getPassword(), user.getPassword())) {
            throw new LoginFail("Invalid email or password");
        }

        String token = jwtUtility.generateAccessToken(user.getId(), user.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return response;
    }
    public User register(User incoming) {
        if (incoming == null || incoming.getEmail() == null || incoming.getPassword() == null || incoming.getFullName() == null) {
            throw new LoginFail("Full name, email, and password are required");
        }
        if (userRepo.existsByEmail(incoming.getEmail())) {
            throw new LoginFail("Email already exists");
        }
        incoming.setId(null);
        incoming.setPassword(passwordEncoder.encode(incoming.getPassword()));
        incoming.setTodos(null);
        return userRepo.save(incoming);
    }
    public boolean validateToken(String authorizationHeader) {
        if (authorizationHeader == null || authorizationHeader.isBlank()) {
            throw new AuthFail("Missing Authorization header");
        }

        if (!authorizationHeader.startsWith("Bearer ")) {
            throw new AuthFail("Authorization must start with 'Bearer '");
        }

        String token = authorizationHeader.substring(7).trim();
        if (token.isEmpty()) {
            throw new AuthFail("Token is empty");
        }

        return jwtUtility.isTokenValid(token);
    }
}