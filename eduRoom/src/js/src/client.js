import fetch from 'unfetch';

export const baseUrl = "http://localhost:5000/api/";

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

export const getAllUsers = () =>
    fetch(baseUrl + 'users').then(checkStatus);

export const addNewUser = user =>
    fetch(baseUrl + 'users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    })
        .then(checkStatus);

export const updateUser = (userId, user) =>
    fetch(baseUrl + `users/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(user)
    })
        .then(checkStatus);

export const deleteUser = userId =>
    fetch(baseUrl + `users/${userId}`, {
        method: 'DELETE'
    })
        .then(checkStatus);

export const findUser = userId =>
    fetch(baseUrl + `users/${userId}`, {
        method: 'GET'
    })
        .then(checkStatus);
