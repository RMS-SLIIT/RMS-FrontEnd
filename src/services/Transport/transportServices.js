import { api } from "../axiosServices";

export const getAllTransport = () => {
    return new Promise((resolve, reject) => {
        api("GET", "base", "/transport", "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const addTransport = (data) => {
    return new Promise((resolve, reject) => {
        api("POST", "base", "/transport", "", data, "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const deleteTransportById = (id) => {
    return new Promise((resolve, reject) => {
        api("DELETE", "base", "/transport", "", "", id)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const updateTransport = (data) => {
    return new Promise((resolve, reject) => {
        api("PUT", "base", "/transport", "", data, "")
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
