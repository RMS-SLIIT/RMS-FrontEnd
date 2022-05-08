import { api } from "../axiosServices";

export const getAllBanquetDetails = () => {
    return new Promise((resolve, reject) => {
        api("GET", "base", "/banquet", "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const addBanquetDetails = (data) => {
    return new Promise((resolve, reject) => {
        api("POST", "base", "/banquet", "", data, "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const deleteBanquetDetailsById = (id) => {
    return new Promise((resolve, reject) => {
        api("DELETE", "base", "/banquet", "", "", id)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getBanquetDetailsById = (id) => {
    return new Promise((resolve, reject) => {
        api("GET", "base", `/banquet/${id}`, "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const updateBanquet = (data) => {
    return new Promise((resolve, reject) => {
        api("PUT", "base", "/banquet", "", data, "")
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
