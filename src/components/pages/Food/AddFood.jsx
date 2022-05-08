import React, { useState } from "react";
import { Form, Col, Row, DatePicker } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import "./Food.css";
import {
    noSplCharRegex,
    onlyNumberRegex,
    priceRegex,
} from "../../../utils/regex";
import { addFood } from "../../../services/Food/foodServices";
import { Notification } from "../../../helper/helper";

const AddInventory = (props) => {
    const {
        getFoodDetails,
        viewData,
        setAddVisible,
        visible,
        handleOk,
        handleCancel,
    } = props;

    const [form] = Form.useForm();

    let show = visible;
    form.setFieldsValue(viewData && viewData);

    const onFinish = (values) => {
        console.log("Success:", values);
        addFood(values)
            .then((res) => {
                console.log(res);
                Notification("New Food Detail Added");

                setAddVisible(false);
                getFoodDetails();
            })
            .catch((err) => {
                console.log(err);
            });

        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Modal
            title="New Food Detail"
            width="900px"
            action="form"
            visibleModal={show}
            handleOk={handleOk}
            handleCancel={handleCancel}
            body={
                <Form
                    id="form"
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="addFood"
                    initialValues={{ remember: true }}
                >
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        max: 30,
                                        message:
                                            "Sorry you are exceeding the limit!",
                                    },

                                    {
                                        pattern: new RegExp(noSplCharRegex),
                                        message: "Enter valid Name",
                                    },
                                ]}
                                label="Food Name :  "
                                name="foodName"
                            >
                                <Input placeholder="Food Name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter Price",
                                    },
                                    {
                                        pattern: new RegExp(priceRegex),
                                        message:
                                            "Enter valid Price Ex: 1000.00",
                                    },
                                ]}
                                label="Price :  "
                                name="price"
                            >
                                <Input placeholder="Price" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        pattern: new RegExp(onlyNumberRegex),
                                        message:
                                            "Enter valid Price (only Numbers)",
                                    },
                                ]}
                                label="Quantity :  "
                                name="quantity"
                            >
                                <Input placeholder="Quantity" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            }
        />
    );
};

export default AddInventory;
