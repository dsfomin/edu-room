package com.backend.eduroom.model;

import com.backend.eduroom.util.EntityIdResolver;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIdentityInfo(scope = CourseRegistration.class, property = "id",
        resolver = EntityIdResolver.class,
        generator = ObjectIdGenerators.PropertyGenerator.class)
public class CourseRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(name = "student_id", nullable = false)
    private User user;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    private Boolean isEnrolled;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registeredAt;
}
