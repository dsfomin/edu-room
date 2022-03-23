package com.backend.eduroom.model;

import com.backend.eduroom.util.EntityIdResolver;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@Builder
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
@NoArgsConstructor
@JsonIdentityInfo(scope = Course.class, property = "id",
        resolver = EntityIdResolver.class,
        generator = ObjectIdGenerators.PropertyGenerator.class)
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String name;

    @OneToMany(mappedBy = "course", orphanRemoval = true)
    private Set<Task> tasks;

    @OneToMany(mappedBy = "course", orphanRemoval = true)
    private Set<CourseRegistration> enrolledUsers;

    @ManyToMany
    @JoinTable(
            name = "course_teachers",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id"))
    private Set<User> courseTeachers = new HashSet<>();

    @Override
    public String toString() {
        return "Course: [" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", name='" + name + '\'' +
                ']';
    }
}
