package com.backend.eduroom.model;

import com.backend.eduroom.util.View;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = {"id"})
@Table(
        uniqueConstraints = {@UniqueConstraint(columnNames = {"task_id", "student_id"})}
)
public class TaskProgress implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.TaskView.Internal.class)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonView(View.TaskView.Internal.class)
    @JsonIgnoreProperties(value = "userTasks", allowSetters = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    @JsonView(View.TaskView.Internal.class)
    @JsonIgnoreProperties(value = "taskProgresses", allowSetters = true)
    private Task task;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonView(View.TaskView.Internal.class)
    private LocalDateTime lastUpdate;

    @Enumerated(EnumType.STRING)
    @JsonView(View.TaskView.Internal.class)
    private TaskStatus taskStatus;

    @Override
    public String toString() {
        return "TaskProgress{" +
                "id=" + id +
                ", user=" + user.getId() +
                ", task=" + task.getId() +
                ", lastUpdate=" + lastUpdate +
                ", taskStatus=" + taskStatus +
                '}';
    }
}
