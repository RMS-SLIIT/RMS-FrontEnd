import React from "react";
import { Form, Col, Row } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import "./AddInventory.css";
import {
    noSplCharRegex,
    onlyNumberRegex,
    priceRegex,
} from "../../../utils/regex";
import { updateInventory } from "../../../services/inventory/inventoryServices";
import { inventoryUpdateSuccess } from "../../../helper/helper";

function EditInventory(props) {
    const {
        editData,
        setEditVisible,
        visible,
        handleOk,
        handleCancel,
        getInventoryDetails,
    } = props;
    const [form] = Form.useForm();
    let show = visible;

    form.setFieldsValue(editData && editData);

    const onFinish = (values) => {
        console.log("Success:", values);
        updateInventory(values)
            .then((res) => {
                console.log(res);

                form.resetFields();
                inventoryUpdateSuccess();

                getInventoryDetails();
                setEditVisible(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Modal
            title="Edit Inventory Detail"
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
                                label="Inventory ID"
                                hidden={true}
                                name="id"
                            >
                                <Input
                                    disabled={true}
                                    style={{ width: "70%" }}
                                    placeholder="Inventory Id"
                                />
                            </Form.Item>
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
                        {/* <Col span={12} style={{ padding: "5px" }}>
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
                        </Col> */}
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
}

export default EditInventory;
