import React from "react";
import { Typography } from "antd";
import scss from "./customTypography.module.scss";

const CustomTypography = (props) => {
    const {
        code,
        viewLable,
        viewInfo,
        copyable,
        disabled,
        editable,
        ellipsis,
        keyboard,
        mark,
        onClick,
        strong,
        italic,
        type,
        underline,
        style
    } = props;
    return (
        <Typography
            code={code}
            copyable={copyable}
            disabled={disabled}
            editable={editable}
            ellipsis={ellipsis}
            keyboard={keyboard}
            mark={mark}
            onClick={onClick}
            strong={strong}
            italic={italic}
            type={type}
            underline={underline}
            style={style}
            className={
                viewLable
                    ? `${scss.viewLable}`
                    : viewInfo
                    ? `${scss.viewInfo}`
                    : ""
            }
        >
            {props.children}
        </Typography>
    );
};

export default CustomTypography;
