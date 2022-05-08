import { api } from "../axiosServices";

export const getAllRoomDetails = () => {
    return new Promise((resolve, reject) => {
        api("GET", "base", "/roomdetail", "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const addRoomDetail = (data) => {
    return new Promise((resolve, reject) => {
        api("POST", "base", "/roomdetail", "", data, "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const deleteRoomDetailsById = (id) => {
    return new Promise((resolve, reject) => {
        api("DELETE", "base", "/roomdetail", "", "", id)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getRoomDetailsById = (id) => {
    return new Promise((resolve, reject) => {
        api("GET", "base", `/roomdetail/${id}`, "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const updateRoomDetail = (data) => {
    return new Promise((resolve, reject) => {
        api("PUT", "base", "/roomdetail", "", data, "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getTableMulitiSearch = (url, field) => {
    return new Promise((resolve, reject) => {
        api("GET", "base", `/${url}?${field}`, "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
