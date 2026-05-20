package com.abdelhadielomari.banck.Security;

import com.abdelhadielomari.banck.entities.AppUser;
import com.abdelhadielomari.banck.repositories.AppUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AppUserRepository appUserRepository;

    /**
     * Charge les détails de l'utilisateur par nom d'utilisateur
     * Récupère l'utilisateur de la base de données et crée un objet UserDetails
     */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Loading user by username: {}", username);

        AppUser appUser = appUserRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("User not found with username: {}", username);
                    return new UsernameNotFoundException("User not found with username: " + username);
                });

        return new User(
                appUser.getUsername(),
                appUser.getPassword(),
                appUser.getEnabled(),
                appUser.getAccountNonExpired(),
                appUser.getCredentialsNonExpired(),
                appUser.getAccountNonLocked(),
                getAuthorities(appUser)
        );
    }

    /**
     * Récupère les autorités (rôles) de l'utilisateur
     */
    private Collection<? extends GrantedAuthority> getAuthorities(AppUser appUser) {
        return appUser.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList());
    }
}
