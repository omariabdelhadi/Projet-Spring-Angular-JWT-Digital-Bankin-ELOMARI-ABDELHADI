package com.abdelhadielomari.banck.services;

import com.abdelhadielomari.banck.Security.JwtTokenProvider;
import com.abdelhadielomari.banck.dtos.AuthLoginRequest;
import com.abdelhadielomari.banck.dtos.AuthRegisterRequest;
import com.abdelhadielomari.banck.dtos.AuthResponse;
import com.abdelhadielomari.banck.entities.AppUser;
import com.abdelhadielomari.banck.entities.Role;
import com.abdelhadielomari.banck.repositories.AppUserRepository;
import com.abdelhadielomari.banck.repositories.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Authentifie un utilisateur avec son nom d'utilisateur et mot de passe
     * Retourne un token JWT si l'authentification est réussie
     */
    public AuthResponse login(AuthLoginRequest loginRequest) {
        log.info("Attempting login for user: {}", loginRequest.getUsername());

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            String token = jwtTokenProvider.generateToken(authentication);
            
            AppUser appUser = appUserRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Set<String> roles = appUser.getRoles()
                    .stream()
                    .map(Role::getName)
                    .collect(Collectors.toSet());

            log.info("User {} successfully logged in", loginRequest.getUsername());

            return AuthResponse.builder()
                    .message("User logged in successfully")
                    .accessToken(token)
                    .tokenType("Bearer")
                    .expiresIn(jwtTokenProvider.getExpirationTime() / 1000) // Convertir en secondes
                    .username(appUser.getUsername())
                    .roles(roles)
                    .build();

        } catch (Exception e) {
            log.error("Login failed for user: {}", loginRequest.getUsername());
            throw new RuntimeException("Invalid username or password");
        }
    }

    /**
     * Enregistre un nouvel utilisateur
     */
    public AuthResponse register(AuthRegisterRequest registerRequest) {
        log.info("Attempting to register user: {}", registerRequest.getUsername());

        // Vérifier si l'utilisateur existe déjà
        if (appUserRepository.existsByUsername(registerRequest.getUsername())) {
            log.warn("Username already exists: {}", registerRequest.getUsername());
            throw new RuntimeException("Username already exists");
        }

        if (appUserRepository.existsByEmail(registerRequest.getEmail())) {
            log.warn("Email already exists: {}", registerRequest.getEmail());
            throw new RuntimeException("Email already exists");
        }

        // Créer un nouvel utilisateur
        Set<Role> roles = new HashSet<>();
        if (registerRequest.getRoles() != null && !registerRequest.getRoles().isEmpty()) {
            roles = registerRequest.getRoles()
                    .stream()
                    .map(roleName -> roleRepository.findByName(roleName)
                            .orElseThrow(() -> new RuntimeException("Role not found: " + roleName)))
                    .collect(Collectors.toSet());
        } else {
            // Rôle par défaut: USER
            Role userRole = roleRepository.findByName("USER")
                    .orElseThrow(() -> new RuntimeException("Default USER role not found"));
            roles.add(userRole);
        }

        AppUser appUser = AppUser.builder()
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .email(registerRequest.getEmail())
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .enabled(true)
                .accountNonLocked(true)
                .accountNonExpired(true)
                .credentialsNonExpired(true)
                .roles(roles)
                .build();

        appUserRepository.save(appUser);

        log.info("User {} successfully registered", registerRequest.getUsername());

        Set<String> roleNames = roles.stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        return AuthResponse.builder()
                .message("User registered successfully")
                .username(appUser.getUsername())
                .roles(roleNames)
                .build();
    }
}
