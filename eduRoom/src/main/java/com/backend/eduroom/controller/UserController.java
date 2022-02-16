package com.backend.eduroom.controller;

import com.backend.eduroom.model.User;
import com.backend.eduroom.model.UserRole;
import com.backend.eduroom.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(path = "{userId}")
    public User getUser(@PathVariable("userId") Long userId) {
        return userService.getUser(userId);
    }

    @PostMapping
    public void addNewStudent(@RequestBody User user) {
        user.setIsActive(true);
        user.setRoles(Set.of(UserRole.USER));
        userService.addNewUser(user);
    }

    @PutMapping(path = "{userId}")
    public void updateStudent(@PathVariable("userId") Long userId,
                              @RequestBody User user) {
        user.setId(userId);
        userService.addNewUser(user);
    }

    @DeleteMapping("{userId}")
    public void deleteStudent(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

}
