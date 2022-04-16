import React from "react";
import scss from "./datepicker.module.scss";
import { DatePicker } from "antd";

const CustomDatePicker = (props) => {
    const {
        allowClear,
        autoFocus,
        bordered,
        className,
        dateRender,
        disabled,
        disabledDate,
        dropdownClassName,
        getPopupContainer,
        inputReadOnly,
        locale,
        mode,
        open,
        panelRender,
        picker,
        placeholder,
        popupStyle,
        size,
        style,
        suffixIcon,
        onOpenChange,
        onPanelChange,
        defaultPickerValue,
        defaultValue,
        disabledTime,
        format,
        renderExtraFooter,
        showNow,
        showTime,
        fullWidth,
        showToday,
        value,
        onChange,
        onOk
    } = props;

    const width = fullWidth ? "100%" : "90%";
    return (
        <DatePicker
            defaultPickerValue={defaultPickerValue}
            defaultValue={defaultValue}
            disabledTime={disabledTime}
            format={format}
            renderExtraFooter={renderExtraFooter}
            showNow={showNow}
            showTime={showTime}
            showToday={showToday}
            value={value}
            onChange={onChange}
            onOk={onOk}
            allowClear={allowClear}
            autoFocus={autoFocus}
            bordered={bordered}
            dateRender={dateRender}
            dropdownClassName={dropdownClassName}
            getPopupContainer={getPopupContainer}
            inputReadOnly={inputReadOnly}
            locale={locale}
            mode={mode}
            open={open}
            panelRender={panelRender}
            picker={picker}
            popupStyle={popupStyle}
            suffixIcon={suffixIcon}
            size={size}
            style={{ ...style, width: "100%" }}
            onPanelChange={onPanelChange}
            onOpenChange={onOpenChange}
            className={className}
            disabled={disabled}
            disabledDate={disabledDate}
            placeholder={placeholder}
        />
    );
};

export default CustomDatePicker;
