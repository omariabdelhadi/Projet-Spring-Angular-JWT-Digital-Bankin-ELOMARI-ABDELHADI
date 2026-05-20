package com.abdelhadielomari.banck.web;

import com.abdelhadielomari.banck.dtos.AuthLoginRequest;
import com.abdelhadielomari.banck.dtos.AuthRegisterRequest;
import com.abdelhadielomari.banck.dtos.AuthResponse;
import com.abdelhadielomari.banck.services.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
@Slf4j
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    /**
     * Endpoint pour l'authentification (login)
     * @param loginRequest Contient username et password
     * @return Token JWT et informations utilisateur
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthLoginRequest loginRequest) {
        log.info("Login request for user: {}", loginRequest.getUsername());
        try {
            AuthResponse response = authenticationService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Login failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(AuthResponse.builder()
                            .message("Login failed: " + e.getMessage())
                            .build());
        }
    }

    /**
     * Endpoint pour l'enregistrement (registration) d'un nouvel utilisateur
     * @param registerRequest Contient username, password, email et optionnellement les rôles
     * @return Message de confirmation d'enregistrement
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody AuthRegisterRequest registerRequest) {
        log.info("Register request for user: {}", registerRequest.getUsername());
        try {
            AuthResponse response = authenticationService.register(registerRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.error("Registration failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(AuthResponse.builder()
                            .message("Registration failed: " + e.getMessage())
                            .build());
        }
    }

    /**
     * Endpoint de vérification du serveur
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Authentication service is running");
    }
}
