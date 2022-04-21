package com.backend.eduroom.service;

import com.backend.eduroom.model.TaskProgress;
import com.backend.eduroom.model.User;
import com.backend.eduroom.model.UserRole;
import com.backend.eduroom.repository.UserRepository;
import com.backend.eduroom.util.PasswordEncoder;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("User with id: " + id + " not found"));
    }

    public void blockUser(Long id) {
        userRepository.blockUser(id);
    }

    public void unblockUser(Long id) {
        userRepository.unblockUser(id);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public User addNewUser(User user) {
        user.setIsActive(true);
        user.setPassword(passwordEncoder.bCryptPasswordEncoder().encode(user.getPassword()));
        user.setAuthorities(Set.of(UserRole.USER));
        return userRepository.save(user);
    }

    public User addNewTeacher(User user) {
        Optional<User> userFromDb = userRepository.findByEmail(user.getEmail());

        return userRepository.save(User.builder()
                .id(userFromDb.map(User::getId).orElse(null))
                .isActive(true)
                .authorities(Set.of(UserRole.USER, UserRole.TEACHER))
                .password(passwordEncoder.bCryptPasswordEncoder().encode(user.getPassword()))
                .chosenCourses(user.getChosenCourses())
                .userTasks(user.getUserTasks())
                .email(user.getEmail())
                .name(user.getName())
                .surname(user.getSurname())
                .build());
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() ->
                new IllegalArgumentException("User with email: " + email + " not found"));
    }
}
