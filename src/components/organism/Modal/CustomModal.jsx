import React, { useState } from "react";

import { Modal } from "antd";
import Button from "../../atoms/Button/CustomButton";
import "./modal.mudule.scss";

export default function CustomModal(props) {
    const {
        defectId,
        title,
        visibleModal,
        body,
        handleOk,
        handleCancel,
        loading,
        width,
        action,
        viewModal,
        editable,
        editForm,
        empId,
        noBtn,
        disabledBtn,
        saveBtn,
        saveDisabled //sarath
    } = props;

    const [disabled, setDisabled] = useState(true);

    return (
        <Modal
            bodyStyle={{ borderRadius: "15px" }}
            width={width}
            title={
                <div
                    style={{
                        width: "100%",
                        cursor: "move",
                        color: "rgba(0,0,0,.85)"
                    }}
                    onMouseOver={() => {
                        if (disabled) {
                            setDisabled(false);
                        }
                    }}
                    onMouseOut={() => {
                        setDisabled(true);
                    }}
                    onFocus={() => {}}
                    onBlur={() => {}}
                >
                    {title}
                    {defectId ? (
                        <div className="defectId">
                            Defect Id : <span>{defectId}</span>
                        </div>
                    ) : empId ? (
                        <div className="defectId">
                            Employee Id : <span>{empId}</span>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            }
            footer={
                saveBtn ? (
                    <Button
                        name="Save"
                        key="submit"
                        onClick={saveBtn}
                        disabled={saveDisabled}
                    />
                ) : viewModal ? (
                    ""
                ) : (
                    [
                        <Button
                            cancel
                            name="Cancel"
                            key="back"
                            onClick={handleCancel}
                        />,
                        action ? (
                            <button
                                className="custom-submit-btn"
                                disabled={editForm ? editable : false}
                                style={{
                                    color: "#fff",
                                    background: "#1890ff",
                                    border: "none",
                                    padding: "4px 14px",
                                    marginLeft: 5,
                                    cursor: "pointer"
                                }}
                                key="submit"
                                type="submit"
                                form={action}
                            >
                                Save
                            </button>
                        ) : noBtn ? (
                            <></>
                        ) : (
                            <Button
                                disabled={disabledBtn}
                                name="Save"
                                key="submit"
                                loading={loading}
                                onClick={handleOk}
                            />
                        )
                    ]
                )
            }
            visible={visibleModal}
            onOk={handleOk}
            style={{ borderRadius: "5px" }}
            onCancel={handleCancel}
        >
            {body}
        </Modal>
    );
}
