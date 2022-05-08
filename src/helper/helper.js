import { notification } from "antd";

// banquet
export const banquetAddSuccess = () =>
    notification.success({
        message: "Banquet detail successfully added",
        duration: 3,
    });

export const banquetDeleteSuccess = () =>
    notification.success({
        message: "Banquet detail successfully deleted",
        duration: 3,
    });

export const banquetUpdateSuccess = () =>
    notification.success({
        message: "Banquet detail successfully updated",
        duration: 3,
    });

// rooms
export const RoomAddSuccess = () =>
    notification.success({
        message: "Room detail successfully added",
        duration: 3,
    });

export const RoomDeleteSuccess = () =>
    notification.success({
        message: "Room detail successfully deleted",
        duration: 3,
    });

export const RoomUpdateSuccess = () =>
    notification.success({
        message: "Room detail successfully updated",
        duration: 3,
    });

// inventory
export const inventoryAddSuccess = () =>
    notification.success({
        message: "Inventory detail successfully added",
        duration: 3,
    });

export const inventoryDeleteSuccess = () =>
    notification.success({
        message: "Inventory detail successfully deleted",
        duration: 3,
    });

export const inventoryUpdateSuccess = () =>
    notification.success({
        message: "Inventory detail successfully updated",
        duration: 3,
    });

// employee
export const employeeAddSuccess = () =>
    notification.success({
        message: "Employee successfully added",
        duration: 3,
    });

export const employeDeleteSuccess = () =>
    notification.success({
        message: "Employee detail successfully deleted",
        duration: 3,
    });

export const employeUpdateSuccess = () =>
    notification.success({
        message: "Employee detail successfully Updated",
        duration: 3,
    });

// vehicleBooking
export const VehicleBookingDeleteSuccess = () =>
    notification.success({
        message: "Vehicle Booking Details successfully deleted",
        duration: 3,
    });

export const VehicleBookingUpdateSuccess = () =>
    notification.success({
        message: "Vehicle Booking Details successfully updated",
        duration: 3,
    });

// roomBooking
export const roomBookingAddSuccess = () =>
    notification.success({
        message: "Room Booking successfully added",
        duration: 3,
    });

export const roomBokingDeleteSuccess = () =>
    notification.success({
        message: "Room Booking  detail successfully deleted",
        duration: 3,
    });

export const roomBokingUpdateSuccess = () =>
    notification.success({
        message: "Room Booking  detail successfully Updated",
        duration: 3,
    });

// transport
export const transportAddSuccess = () =>
    notification.success({
        message: "Transport successfully added",
        duration: 3,
    });

export const transportDeleteSuccess = () =>
    notification.success({
        message: "Transport  detail successfully deleted",
        duration: 3,
    });

export const transportUpdateSuccess = () =>
    notification.success({
        message: "Transport  detail successfully Updated",
        duration: 3,
    });

//convert search url
export const convertSearchUrl = (updateUrl) => {
    console.log(updateUrl);
    let fields = Object.keys(updateUrl);
    let fieldValues = Object.values(updateUrl);
    let url = [];
    for (let i = 0; i < fields.length; i++) {
        url.push(
            `${fields[i]}=${fieldValues[i] == undefined ? "" : fieldValues[i]}` //sarath
        );
    }
    let searchUrl = url.join("&");

    return searchUrl;
};
export const Notification = (message) => {
    return notification.success({
        message: message,
    });
};
