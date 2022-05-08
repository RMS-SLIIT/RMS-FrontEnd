import { api } from "../axiosServices";

export const getAllFood = () => {
    return new Promise((resolve, reject) => {
        api("GET", "base", "/food", "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const addFood = (data) => {
    return new Promise((resolve, reject) => {
        api("POST", "base", "/food", "", data, "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const deleteFoodById = (id) => {
    return new Promise((resolve, reject) => {
        api("DELETE", "base", "/food", "", "", id)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getFoodById = (id) => {
    return new Promise((resolve, reject) => {
        api("GET", "base", `/food/${id}`, "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const updateFood = (data) => {
    return new Promise((resolve, reject) => {
        api("PUT", "base", "/food", "", data, "")
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
