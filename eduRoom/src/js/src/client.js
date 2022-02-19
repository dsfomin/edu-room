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

export const getAllUsers = (token) =>
    fetch(baseUrl + 'users', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(checkStatus);

export const addNewUser = (user, token) =>
    fetch(baseUrl + 'users', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify(user),
    })
        .then(checkStatus);

export const updateUser = (userId, user, token) =>
    fetch(baseUrl + `users/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'PUT',
        body: JSON.stringify(user),
    })
        .then(checkStatus);

export const deleteUser = (userId, token) =>
    fetch(baseUrl + `users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(checkStatus);

export const findUser = (userId, token) =>
    fetch(baseUrl + `users/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
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


