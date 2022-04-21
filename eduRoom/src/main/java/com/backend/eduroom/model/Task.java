package com.backend.eduroom.model;

import com.backend.eduroom.util.View;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
public class Task implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.TaskView.IdTask.class)
    private Long id;

    @JsonView(View.TaskView.IdTask.class)
    private String task;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonView({View.TaskView.External.class})
    private Course course;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    @JsonView({View.TaskView.External.class})
    private User teacher;

    @OneToMany(mappedBy = "task", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonView({View.TaskView.Internal.class})
    private Set<TaskProgress> taskProgresses = new HashSet<>();

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonView({View.TaskView.Internal.class})
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonView({View.TaskView.Internal.class})
    private LocalDateTime expiresAt;

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", task='" + task + '\'' +
                ", course=" + course.getId() +  " " + course.getName() +
                ", teacher=" + teacher.getId() +  " " + teacher.getEmail() +
                ", createdAt=" + createdAt +
                ", expiresAt=" + expiresAt +
                '}';
    }
}
