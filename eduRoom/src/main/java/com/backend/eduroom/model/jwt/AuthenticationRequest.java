package com.backend.eduroom.model.jwt;

import com.backend.eduroom.util.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Getter;

@Getter
@JsonView(View.UserView.Login.class)
public class AuthenticationRequest {
    private String email;
    private String password;
}
