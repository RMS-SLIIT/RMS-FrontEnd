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
