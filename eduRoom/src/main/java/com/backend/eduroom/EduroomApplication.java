package com.backend.eduroom;

import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@AllArgsConstructor
@SpringBootApplication
public class EduroomApplication {
    public static void main(String[] args) {
        SpringApplication.run(EduroomApplication.class, args);
    }
}
