package com.backend.eduroom.service;

import com.backend.eduroom.model.User;
import com.backend.eduroom.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("User with id: " + id + " not found"));
    }

    public void blockUser(Long id) {
        userRepository.blockUser(id);
    }

    public void unblockUser(Long id) {
        userRepository.unblockUser(id);
    }

    public User addNewUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
