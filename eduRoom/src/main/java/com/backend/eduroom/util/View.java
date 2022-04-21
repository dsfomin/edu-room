package com.backend.eduroom.util;

public class View {
    public interface UserView {
        interface IdMail {}
        interface Login extends IdMail {}
        interface Internal extends IdMail {}
        interface Courses extends Internal {}
        interface Tasks extends Internal {}
    }

    public interface CourseView {
        interface IdName {}
        interface Internal extends IdName {}
        interface Tasks extends Internal {}
    }

    public interface TaskView {
        interface IdTask {}
        interface Internal extends IdTask {}
        interface External extends Internal {}
    }
}
