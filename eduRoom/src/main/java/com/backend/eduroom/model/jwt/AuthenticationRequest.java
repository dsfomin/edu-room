package com.backend.eduroom.model.jwt;

import lombok.Getter;

@Getter
public class AuthenticationRequest {
    private String email;
    private String password;
}
