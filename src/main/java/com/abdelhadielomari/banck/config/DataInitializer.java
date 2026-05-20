package com.abdelhadielomari.banck.config;

import com.abdelhadielomari.banck.entities.Role;
import com.abdelhadielomari.banck.repositories.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class DataInitializer {

    /**
     * Initialise les rôles par défaut dans la base de données au démarrage de l'application
     */
    @Bean
    public CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            log.info("Initializing roles...");

            // Créer le rôle ADMIN s'il n'existe pas
            if (roleRepository.findByName("ADMIN").isEmpty()) {
                Role adminRole = Role.builder()
                        .name("ADMIN")
                        .description("Administrator role - Full access")
                        .build();
                roleRepository.save(adminRole);
                log.info("ADMIN role created");
            }

            // Créer le rôle USER s'il n'existe pas
            if (roleRepository.findByName("USER").isEmpty()) {
                Role userRole = Role.builder()
                        .name("USER")
                        .description("User role - Limited access")
                        .build();
                roleRepository.save(userRole);
                log.info("USER role created");
            }

            log.info("Roles initialization completed");
        };
    }
}
