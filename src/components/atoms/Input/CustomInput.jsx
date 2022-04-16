import React from "react";
import { Input } from "antd";
export default function CustomInput(props) {
    const {
        density,
        placeholder,
        disabled,
        id,
        size,
        defaultValue,
        type,
        value,
        onChange,
        fullWidth,
        width,
        tableSearch,
        hidden,
        onPressEnter,
        addonAfter,
        className
    } = props;
    const widths = fullWidth ? "100%" : "90%";

    const style = density
        ? {
              width: "120px",
              height: "29px",
              marginBottom: "10px",
              borderRadius: "10px",
              border: "1px solid #6f86a7"
          }
        : {
              width: width,
              height: tableSearch ? 30 : "",
              padding: "5px"
          };
    return (
        <Input
            hidden={hidden}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            defaultValue={defaultValue}
            type={type}
            value={value}
            onChange={onChange}
            style={style}
            onPressEnter={onPressEnter}
            addonAfter={addonAfter}
            className={className}
        />
    );
}
