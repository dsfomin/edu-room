package com.backend.eduroom.controller;

import com.backend.eduroom.model.User;
import com.backend.eduroom.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getAllUsers(@PathVariable Long userId) {
        return userService.findUserById(userId);
    }
}
