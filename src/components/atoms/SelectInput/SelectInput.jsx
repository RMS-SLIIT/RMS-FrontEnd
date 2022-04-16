import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectInput = (props) => {
    const {
        placeholder,
        allowClear,
        disabled,
        options,
        id,
        size,
        defaultValue,
        value,
        onChange,
        fullWidth,
        childElements,
        addProject,
        style,
        projectSelect,
        defectAdd,
        onFocus,
        onClick,
        onSelect,
        topSelect
    } = props;
    const width = fullWidth
        ? "100%"
        : projectSelect || topSelect
        ? "150px"
        : defectAdd
        ? "100px"
        : "100%";
    const marginLeft = addProject ? -20 : "";
    return (
        <Select
            onSelect={onSelect}
            onClick={onClick}
            onFocus={onFocus}
            allowClear={allowClear === undefined ? true : allowClear} //Qudeson
            options={options}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            style={{
                ...style,
                ...{ width: width, borderRadius: "5px" }
            }}
        >
            {childElements
                ? childElements.map((child, i) => (
                      <Option key={i} value={child.value}>
                          {child.text}
                      </Option>
                  ))
                : ""}
        </Select>
    );
};

export default SelectInput;
