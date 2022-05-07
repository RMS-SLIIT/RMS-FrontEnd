import React, { useState } from "react";
import { Form, Col, Row, DatePicker, InputNumber } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import "./AddInventory.css";
import {
    noSplCharRegex,
    onlyNumberRegex,
    priceRegex,
} from "../../../utils/regex";
import { addInventoryDetails } from "../../../services/inventory/inventoryServices";
import { Notification } from "../../../helper/helper";

const AddInventory = (props) => {
    const [supplierDisappliedDate, setSupplierDisappliedDate] = useState();
    const dateFormat = "YYYY-MM-DD";

    const {
        getInventoryDetails,
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
        addInventoryDetails(values)
            .then((res) => {
                console.log(res);
                Notification("New Inventory Detail Added");

                setAddVisible(false);
                getInventoryDetails();
            })
            .catch((err) => {
                console.log(err);
            });

        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const dateOnChange = (value, dateString) => {
        setSupplierDisappliedDate(dateString);
    };

    function onChangeQty(value) {
        console.log("changed", value);
    }

    return (
        <Modal
            title="New Inventory Detail"
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
                    className="addInventory"
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
                                label="Supplier Name :  "
                                name="supplierName"
                            >
                                <Input placeholder="Guest Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Select Supplier Disaplied Date",
                                    },
                                ]}
                                label="Supplier Disaplied Date :  "
                                name="supplierDisappliedDate"
                            >
                                <DatePicker
                                    allowClear={true}
                                    onChange={dateOnChange}
                                    placeholder="Supplier Disaplied Date"
                                    showNow={true}
                                    disabledTime={true}
                                    format={dateFormat}
                                    inputReadOnly={true}
                                />
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
