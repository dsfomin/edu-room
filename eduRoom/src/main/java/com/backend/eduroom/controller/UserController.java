package com.backend.eduroom.controller;

import com.backend.eduroom.model.User;
import com.backend.eduroom.model.UserRole;
import com.backend.eduroom.model.jwt.AuthenticationRequest;
import com.backend.eduroom.model.jwt.LoginResponse;
import com.backend.eduroom.model.jwt.UserInfo;
import com.backend.eduroom.service.UserService;
import com.backend.eduroom.util.JWTTokenHelper;
import com.backend.eduroom.util.PasswordEncoder;
import com.backend.eduroom.util.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/users")
public class UserController {
    private final static Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTTokenHelper jwtTokenHelper;
    private final UserDetailsService userDetailsService;

    @GetMapping
    @JsonView(View.UserView.Internal.class)
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(path = "{userId}")
    @JsonView(View.UserView.Internal.class)
    public User getUser(@PathVariable("userId") Long userId) {
        return userService.getUser(userId);
    }

    @PostMapping
    @JsonView(View.UserView.Internal.class)
    public void addNewTeacher(@RequestBody User user) {
        userService.addNewTeacher(user);
    }

    @PutMapping(path = "{userId}")
    @JsonView(View.UserView.Internal.class)
    public void updateStudent(@PathVariable("userId") Long userId,
                              @RequestBody User user) {
        user.setId(userId);
        userService.updateUser(user);
    }

    @DeleteMapping("{userId}")
    @JsonView(View.UserView.IdMail.class)
    public void deleteStudent(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

    @PostMapping("/login")
    @JsonView(View.UserView.Login.class)
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();

        String jwtToken = jwtTokenHelper.generateToken(user.getEmail());

        LoginResponse response = new LoginResponse(user, jwtToken);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/userinfo")
    @JsonView(View.UserView.Login.class)
    public ResponseEntity<?> getUserInfo(Principal user){
        User userFromDb = (User) userDetailsService.loadUserByUsername(user.getName());

        UserInfo userInfo = new UserInfo();
        userInfo.setName(userFromDb.getName());
        userInfo.setSurname(userFromDb.getSurname());
        userInfo.setEmail(userFromDb.getEmail());
        userInfo.setRoles(userFromDb.getAuthorities().toArray());

        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/register")
    @JsonView(View.UserView.Login.class)
    public void register(@RequestBody User user) {
        userService.addNewUser(user);
    }

    @GetMapping("/{userId}/block")
    @JsonView(View.UserView.IdMail.class)
    public void blockUser(@PathVariable("userId") Long userId){
        userService.blockUser(userId);
    }

    @GetMapping("/{userId}/unblock")
    @JsonView(View.UserView.IdMail.class)
    public void unblockUser(@PathVariable("userId") Long userId){
        userService.unblockUser(userId);
    }
}
