import { api } from "../axiosServices";

export const getAllRoomBooking = () => {
    return new Promise((resolve, reject) => {
        api("GET", "base", `/roomBooking`, "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export const addRoomBookingDetails = (data) => {
    return new Promise((resolve, reject) => {
        api("POST", "base", "/roomBooking", "", data, "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
export const deleteRoomBookingByID = (id) => {
    return new Promise((resolve, reject) => {
        api("DELETE", "base", "/roomBooking", "", "", id)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
