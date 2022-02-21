package com.backend.eduroom.model.jwt;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String email;
    private Long id;
}