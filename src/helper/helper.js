import { notification } from "antd";

// banquet
export const banquetAddSuccess = () =>
    notification.success({
        message: "Banquet detail successfully added",
        duration: 3
    });

export const banquetDeleteSuccess = () =>
    notification.success({
        message: "Banquet detail successfully deleted",
        duration: 3
    });

// employee
export const employeeAddSuccess = () =>
    notification.success({
        message: "Employee successfully added",
        duration: 3
    });

export const employeDeleteSuccess = () =>
    notification.success({
        message: "Employee detail successfully deleted",
        duration: 3
    });

// vehicleBooking
export const VehicleBookingDeleteSuccess = () =>
    notification.success({
        message: "Vehicle Booking Details successfully deleted",
        duration: 3
    });

// roomBooking
export const roomBookingAddSuccess = () =>
    notification.success({
        message: "Room Booking successfully added",
        duration: 3
    });

export const roomBokingDeleteSuccess = () =>
    notification.success({
        message: "Room Booking  detail successfully deleted",
        duration: 3
    });

export const Notification = (message) => {
    return notification.success({
        message: message
    });
};
