import React from "react";
import TextArea from "antd/lib/input/TextArea";
import "./textarea.module.scss";

const TextAreaInput = (props) => {
    const {
        allowClear,
        autoSize,
        bordered,
        defaultValue,
        maxLength,
        showCount,
        value,
        onPressEnter,
        onResize
    } = props;
    return (
        <TextArea
            allowClear={allowClear}
            autoSize={autoSize}
            bordered={bordered}
            defaultValue={defaultValue}
            maxLength={maxLength}
            showCount={showCount}
            value={value}
            onPressEnter={onPressEnter}
            onResize={onResize}
        />
    );
};

export default TextAreaInput;
