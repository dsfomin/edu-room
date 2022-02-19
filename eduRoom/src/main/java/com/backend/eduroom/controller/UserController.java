package com.backend.eduroom.controller;

import com.backend.eduroom.util.JWTTokenHelper;
import com.backend.eduroom.model.User;
import com.backend.eduroom.model.UserRole;
import com.backend.eduroom.model.jwt.AuthenticationRequest;
import com.backend.eduroom.model.jwt.LoginResponse;
import com.backend.eduroom.model.jwt.UserInfo;
import com.backend.eduroom.service.UserService;
import com.backend.eduroom.util.PasswordEncoder;
import lombok.AllArgsConstructor;
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
@CrossOrigin
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTTokenHelper jwtTokenHelper;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

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
        user.setAuthorities(Set.of(UserRole.USER));
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        String jwtToken = jwtTokenHelper.generateToken(user.getEmail());
        LoginResponse response = new LoginResponse();
        response.setToken(jwtToken);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/userinfo")
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
    public void register(@RequestBody User user) {
        user.setAuthorities(Set.of(UserRole.USER));
        user.setIsActive(true);
        user.setPassword(passwordEncoder.bCryptPasswordEncoder().encode(user.getPassword()));
        userService.addNewUser(user);
    }
}
