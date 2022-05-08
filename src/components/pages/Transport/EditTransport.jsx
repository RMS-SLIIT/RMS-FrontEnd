import React from "react";
import { Form, Col, Row } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import "./Transport.css";
import { noSplCharRegex, priceRegex } from "../../../utils/regex";
import { transportUpdateSuccess } from "../../../helper/helper";
import { updateTransport } from "../../../services/Transport/transportServices";

function EditTransport(props) {
    const {
        editData,
        setEditVisible,
        visible,
        handleOk,
        handleCancel,
        getTransportDetails,
    } = props;
    const [form] = Form.useForm();
    let show = visible;

    form.setFieldsValue(editData && editData);

    const onFinish = (values) => {
        console.log("Success:", values);
        updateTransport(values)
            .then((res) => {
                console.log(res);

                form.resetFields();
                transportUpdateSuccess();

                getTransportDetails();
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
            title="Edit Transport Detail"
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
                    className="addTransport"
                    initialValues={{ remember: true }}
                >
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                label="Transport ID"
                                hidden={true}
                                name="id"
                            >
                                <Input
                                    disabled={true}
                                    style={{ width: "70%" }}
                                    placeholder="Transport Id"
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
                                        message: "Enter valid VehicleType",
                                    },
                                ]}
                                label="Vehicle Type :  "
                                name="vehicleType"
                            >
                                <Input placeholder="Vehicle Type" />
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
                                label="Vehicle Name :  "
                                name="vehicleName"
                            >
                                <Input placeholder="Vehicle Name" />
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
                                label="cost :  "
                                name="cost"
                            >
                                <Input placeholder="cost" />
                            </Form.Item>
                        </Col>
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
                                        message:
                                            "Enter valid Vehicle Facilities",
                                    },
                                ]}
                                label="Vehicle Facilities :  "
                                name="vehiclefacilities"
                            >
                                <Input placeholder="Vehicle Facilities" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            }
        />
    );
}

export default EditTransport;
