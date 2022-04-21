package com.backend.eduroom.model;

import com.backend.eduroom.util.View;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@Builder
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
@NoArgsConstructor
public class Course implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView({View.CourseView.IdName.class, View.TaskView.IdTask.class})
    private Long id;

    @JsonView(View.CourseView.IdName.class)
    private String description;

    @JsonView(View.CourseView.IdName.class)
    private String name;

    @JsonView(View.CourseView.Internal.class)
    @OneToMany(mappedBy = "course", orphanRemoval = true)
    private Set<CourseRegistration> enrolledUsers;

    @JsonView(View.CourseView.Internal.class)
    @ManyToMany
    @JoinTable(name = "course_teachers",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id"))
    private Set<User> courseTeachers = new HashSet<>();

    @JsonView(View.CourseView.Tasks.class)
    @OneToMany(mappedBy = "course")
    private Set<Task> tasks;

    @Override
    public String toString() {
        return "Course: [" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", name='" + name + '\'' +
                ", enrolledUsers ='" + enrolledUsers + '\'' +
                ", courseTeachers='" + courseTeachers + '\'' +
                ']';
    }
}
