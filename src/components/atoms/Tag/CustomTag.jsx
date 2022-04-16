import React from "react";
import { Tag } from "antd";
import scss from "./customtag.module.scss";

const CustomTag = (props) => {
    const {
        status,
        className,
        style,
        closable,
        closeIcon,
        color,
        icon,
        visible,
        onClose,
        statusTitle
    } = props;

    return (
        <Tag
            visible={visible}
            closable={closable}
            closeIcon={closeIcon}
            color={color}
            icon={icon}
            onClose={onClose}
            className={status ? scss.status : className}
            style={
                ({ ...style },
                statusTitle && {
                    height: "42px",
                    width: "55px",
                    marginRight: "0",
                    fontWeight: 600
                })
            }
        >
            {props.children}
        </Tag>
    );
};

export default CustomTag;
