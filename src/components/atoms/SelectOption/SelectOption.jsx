import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectOption = (props) => {
    const { className, disabled, title, value } = props;
    return (
        <Option
            className={className}
            disabled={disabled}
            title={title}
            value={value}
        >
            {props.children}
        </Option>
    );
};

export default SelectOption;
