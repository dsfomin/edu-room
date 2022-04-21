package com.backend.eduroom.model;

import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;

public enum UserRole implements GrantedAuthority, Serializable {
    USER,
    TEACHER,
    ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}