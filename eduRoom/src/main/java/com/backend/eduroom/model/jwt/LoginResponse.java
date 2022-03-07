package com.backend.eduroom.model.jwt;

import com.backend.eduroom.model.User;
import com.backend.eduroom.model.UserRole;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class LoginResponse {
    private String token;
    private String email;
    private Set<String> authorities;
    private Long id;

    public LoginResponse(User user, String token) {
        this.id = user.getId();
        this.token = token;
        this.email = user.getEmail();
        this.authorities = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
    }
}