package com.backend.eduroom.model;

import com.backend.eduroom.util.EntityIdResolver;
import com.backend.eduroom.util.View;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
@Builder
public class CourseRegistration implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.CourseView.Internal.class)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonView(View.CourseView.Internal.class)
    @JsonIgnoreProperties(value = "chosenCourses", allowSetters = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @JsonView(View.CourseView.Internal.class)
    @JsonIgnoreProperties(value = "enrolledUsers", allowSetters = true)
    private Course course;

    @JsonView(View.CourseView.Internal.class)
    private Boolean isEnrolled;

    @JsonView(View.CourseView.Internal.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registeredAt;

    @Override
    public String toString() {
        return "CourseRegistration{" +
                "id=" + id +
                ", user=" + user.getId() +
                ", course=" + course.getId() +
                ", isEnrolled=" + isEnrolled +
                ", registeredAt=" + registeredAt +
                '}';
    }
}
