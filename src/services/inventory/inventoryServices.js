import { api } from "../axiosServices";

export const getAllInventoryDetails = () => {
    return new Promise((resolve, reject) => {
        api("GET", "base", "/inventory", "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const addInventoryDetails = (data) => {
    return new Promise((resolve, reject) => {
        api("POST", "base", "/inventory", "", data, "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const deleteInventoryDetailsById = (id) => {
    return new Promise((resolve, reject) => {
        api("DELETE", "base", "/inventory", "", "", id)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getInventoryDetailsById = (id) => {
    return new Promise((resolve, reject) => {
        api("GET", "base", `/inventory/${id}`, "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const updateInventory = (data) => {
    return new Promise((resolve, reject) => {
        api("PUT", "base", "/inventory", "", data, "")
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
