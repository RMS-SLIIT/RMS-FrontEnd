import { api } from "../axiosServices";

export const getAllVehicleBookingDetails = () => {
    return new Promise((resolve, reject) => {
        api("GET", "base", "/vehicleBooking", "", "", "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const addVehicleBookingtDetails = (data) => {
    return new Promise((resolve, reject) => {
        api("POST", "base", "/vehicleBooking", "", data, "")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const deleteVehicleBookingDetailsById = (id) => {
    return new Promise((resolve, reject) => {
        api("DELETE", "base", "/vehicleBooking", "", "", id)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const updateVehicleBooking = (data) => {
    return new Promise((resolve, reject) => {
        api("PUT", "base", "/vehicleBooking", "", data, "")
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
