import fetch from 'unfetch';

export const baseUrl = "http://localhost:5000/api/";
const authorizationHeader = 'Bearer ';

const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        response.json().then(e => {
            error.error = e;
        });
        return Promise.reject(error);
    }
}

// USER API

// export const getAllUsers = (token) =>
//     fetch(baseUrl + `users`, {
//         method: 'GET',
//         headers: {
//             'Authorization': authorizationHeader + token
//         }
//     })
//         .then(checkStatus);

export const addNewTeacher = (user, token) =>
    fetch(baseUrl + 'users', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader + token
        },
        method: 'POST',
        body: JSON.stringify(user),
    })
        .then(checkStatus);

export const updateUser = (userId, user, token) =>
    fetch(baseUrl + `users/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader + token
        },
        method: 'PUT',
        body: JSON.stringify(user),
    })
        .then(checkStatus);

export const deleteUser = (userId, token) =>
    fetch(baseUrl + `users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const findUser = (userId, token) =>
    fetch(baseUrl + `users/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const blockUser = (userId, token) =>
    fetch(baseUrl + `users/${userId}/block`, {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const unblockUser = (userId, token) =>
    fetch(baseUrl + `users/${userId}/unblock`, {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const authenticateUser = (user) =>
    fetch(baseUrl + `users/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    })
        .then(checkStatus);

export const registerUser = (user) =>
    fetch(baseUrl + `users/register`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    })
        .then(checkStatus);

// COURSE API

export const addNewCourse = (course, token) =>
    fetch(baseUrl + 'courses', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader + token
        },
        method: 'POST',
        body: JSON.stringify(course),
    })
        .then(checkStatus);

export const getAllCourses = (token) =>
    fetch(baseUrl + 'courses', {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const deleteCourse = (courseId, token) =>
    fetch(baseUrl + `courses/${courseId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const findCourse = (courseId, token) =>
    fetch(baseUrl + `courses/${courseId}`, {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const updateCourse = (courseId, course, token) =>
    fetch(baseUrl + `courses/${courseId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader + token
        },
        method: 'PUT',
        body: JSON.stringify(course),
    })
        .then(checkStatus);

export const participate = (courseId, token) =>
    fetch(baseUrl + `courses/${courseId}/participate`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader + token
        },
        method: 'POST',
    })
        .then(checkStatus());

// TASK API

export const addNewTask = (task, courseId, token) =>
    fetch(baseUrl + `tasks/${courseId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader + token
        },
        method: 'POST',
        body: JSON.stringify(task)
    })
        .then(checkStatus);

export const getAllTasks = (token) =>
    fetch(baseUrl + 'tasks', {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const getAllTasksByCourse = (token, courseId) =>
    fetch(baseUrl + 'tasks/course/' + courseId, {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const deleteTask = (taskId, token) =>
    fetch(baseUrl + `tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const findTask = (taskId, token) =>
    fetch(baseUrl + `tasks/${taskId}`, {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const updateTask = (taskId, task, token) =>
    fetch(baseUrl + `tasks/${taskId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader + token
        },
        method: 'PUT',
        body: JSON.stringify(task),
    })
        .then(checkStatus);

export const submitTask = (taskId, userId, token) =>
    fetch(baseUrl + `tasks/submit/${taskId}/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const getTaskProgressByTaskAndUser = (taskId, userId, token) =>
    fetch(baseUrl + `tasks/task-page/${taskId}/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);

export const getAllMyTasks = (userId, token) =>
    fetch(baseUrl + `tasks/my-tasks/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': authorizationHeader + token
        }
    })
        .then(checkStatus);
