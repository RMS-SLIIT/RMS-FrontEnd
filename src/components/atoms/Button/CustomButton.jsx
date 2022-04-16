import React, { useRef } from "react";
import { Button } from "antd";
import scss from "./custombutton.module.scss";

export default function CustomButton(props) {
    const {
        cancel,
        type,
        addBtn,
        save,
        name,
        className,
        style,
        disabled,
        loading,
        shape,
        size,
        onClick,
        htmlType,
        icon,
        ref,
        designation,
        tableSearch,
        density
    } = props;

    const btnRef = useRef(ref);
    return (
        <Button
            ref={btnRef}
            className={addBtn ? scss.circleBtn : className}
            style={
                type === "default"
                    ? {
                          ...style,
                          ...{
                              color: "black",
                              borderRadius: "5px",
                              boxShadow: "2px 3px #888888",
                              border: "1px solid #2d2d2e"
                          }
                      }
                    : addBtn
                    ? {
                          ...style,
                          ...{
                              width: 50,
                              height: 50,
                              minWidth: 25,
                              backgroundColor: "#00EBC7",
                              color: "#fff",
                              border: "none"
                          }
                      }
                    : save
                    ? {
                          ...style,
                          ...{
                              fontWeight: 600,
                              width: 80,
                              height: 35,
                              minWidth: 25,
                              borderRadius: 50,
                              backgroundColor: "#048ADB",
                              color: "#fff",
                              border: "none"
                          }
                      }
                    : cancel
                    ? {
                          ...style,
                          ...{}
                      }
                    : designation
                    ? {
                          ...style,
                          ...{
                              color: "#000",
                              background: "#fff",
                              borderRadius: 3
                          }
                      }
                    : tableSearch
                    ? {
                          ...style,
                          ...{
                              fontWeight: 600,
                              width: 76,
                              height: 30,
                              minWidth: 25,
                              borderRadius: 3,
                              backgroundColor: "#048ADB",
                              color: "#fff",
                              border: "none"
                          }
                      }
                    : density
                    ? {
                          ...style,
                          ...{
                              color: "#fff",
                              background: "#1890ff",
                              borderRadius: 3,
                              width: 15,
                              height: 15
                          }
                      }
                    : {
                          ...style,
                          ...{
                              color: "#fff",
                              background: "#1890ff",
                              borderRadius: 3
                          }
                      }
            }
            icon={icon}
            htmlType={htmlType}
            type={type}
            disabled={disabled}
            loading={loading}
            shape={shape}
            size={size}
            onClick={onClick}

            // form="form"
        >
            {name}
            {props.children}
        </Button>
    );
}
