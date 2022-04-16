import React from "react";
import { Tooltip } from "antd";
const CustomToolTip = (props) => {
    const {
        title,
        mouseEnterDelay,
        placement,
        visible,
        onVisibleChange,
        mouseLeaveDelay,
        align,
        arrowPointAtCenter,
        autoAdjustOverflow,
        color,
        trigger
    } = props;
    return (
        <Tooltip
            trigger={trigger}
            title={title}
            align={align}
            arrowPointAtCenter={arrowPointAtCenter}
            autoAdjustOverflow={autoAdjustOverflow}
            color={color}
            mouseEnterDelay={mouseEnterDelay}
            mouseLeaveDelay={mouseLeaveDelay}
            placement={placement}
            visible={visible}
            onVisibleChange={onVisibleChange}
        >
            {props.children}
        </Tooltip>
    );
};

export default CustomToolTip;
