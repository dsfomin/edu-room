package com.backend.eduroom.model;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    USER,
    TEACHER,
    ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}