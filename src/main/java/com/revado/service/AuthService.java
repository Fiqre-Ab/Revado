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

        if (!credentials.getPassword().equals(user.getPassword())) {
            throw new LoginFail("Invalid email or password");
        }

        String token = jwtUtility.generateAccessToken(user.getId(), user.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return response;
    }

    public boolean validateToken(String authorizationHeader) {
        if (authorizationHeader == null || authorizationHeader.isBlank()) {
            throw new AuthFail("Missing Authorization header");
        }

        if (!authorizationHeader.startsWith("Bearer ")) {
            throw new AuthFail("Authorization start");
        }

        String token = authorizationHeader.substring(7).trim();
        if (token.isEmpty()) {
            throw new AuthFail("Token is empty");
        }

        return jwtUtility.isTokenValid(token);
    }
}