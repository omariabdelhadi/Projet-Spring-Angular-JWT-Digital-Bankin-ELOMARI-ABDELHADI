package com.abdelhadielomari.banck.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String message;
    private String accessToken;
    private String tokenType = "Bearer";
    private Long expiresIn;
    private String username;
    private Set<String> roles;
}
