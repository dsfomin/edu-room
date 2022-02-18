package com.backend.eduroom.model.jwt;

import lombok.Data;

@Data
public class UserInfo {
    private String name;
    private String surname;
    private String email;
    private Object roles;
}
