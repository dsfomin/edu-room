import http from "../http-common";
const authorizationHeader = 'Bearer ';

const getAll = (token, params = new URLSearchParams()) => {

    return http.get("/users", {
        headers: {
            'Authorization': authorizationHeader + token
        }, params
    });
};
const get = id => {
    return http.get(`/tutorials/${id}`);
};
const create = data => {
    return http.post("/tutorials", data);
};
const update = (id, data) => {
    return http.put(`/tutorials/${id}`, data);
};
const remove = id => {
    return http.delete(`/tutorials/${id}`);
};

const UserService = {
    getAll,
    get,
    create,
    update,
    remove,
};
export default UserService;