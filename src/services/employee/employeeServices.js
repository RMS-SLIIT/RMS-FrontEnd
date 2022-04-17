import { api } from "../axiosServices";

export const getAllEmployee = () => {
    return new Promise((resolve, reject) => {
        api("GET", "base", `/employee`, "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export const addEmployee = (data) => {
    return new Promise((resolve, reject) => {
        api("POST", "base", "/employee", "", data, "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export const deleteEmployeeByID = (id) => {
    return new Promise((resolve, reject) => {
        api("DELETE", "base", "/employee", "", "", id)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
