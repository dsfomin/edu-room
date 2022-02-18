package com.backend.eduroom;

import com.backend.eduroom.model.User;
import com.backend.eduroom.model.UserRole;
import com.backend.eduroom.repository.UserRepository;
import com.backend.eduroom.util.PasswordEncoder;
import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.Set;

@AllArgsConstructor
@SpringBootApplication
public class EduroomApplication {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(EduroomApplication.class, args);
    }


//    @PostConstruct
//    protected void init() {
//        User user = User.builder()
//                .name("u")
//                .surname("s")
//                .roles(Set.of(UserRole.USER))
//                .email("k")
//                .password(passwordEncoder.bCryptPasswordEncoder().encode("2"))
//                .isActive(true)
//                .build();
//        userRepository.save(user);
//    }
}
