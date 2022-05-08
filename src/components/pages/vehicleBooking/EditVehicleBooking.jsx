import React from "react";
import { Form, Col, Row } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import { nicRegex, phoneNumberRegex } from "../../../utils/regex";
import { updateVehicleBooking } from "../../../services/vehicleBooking/vehicleBookingServices";
import { VehicleBookingUpdateSuccess } from "../../../helper/helper";

function EditVehicleBooking(props) {
    const {
        editData,
        setEditVisible,
        visible,
        handleOk,
        handleCancel,
        getVehicleBookingDetails,
    } = props;
    const [form] = Form.useForm();
    let show = visible;

    form.setFieldsValue(editData && editData);

    const onFinish = (values) => {
        console.log("Success:", values);
        updateVehicleBooking(values)
            .then((res) => {
                console.log(res);

                form.resetFields();
                VehicleBookingUpdateSuccess();

                getVehicleBookingDetails();
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
            title="Edit Vehicle"
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
                    className="addVehicle"
                    initialValues={{ remember: true }}
                >
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                label="Vehicle Booking ID"
                                hidden={true}
                                name="id"
                            >
                                <Input
                                    disabled={true}
                                    style={{ width: "70%" }}
                                    placeholder="Vehicle Booking Id"
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
                                ]}
                                label="User Name :  "
                                name="userName"
                            >
                                <Input placeholder="User Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: "Select date Of the Event",
                                    },
                                ]}
                                label="No Of Km :  "
                                name="noOfKm"
                            >
                                <Input placeholder="No Of Km" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                label="Email"
                                rules={[
                                    {
                                        type: "email",

                                        message: "Enter valid email address",
                                    },
                                    {
                                        required: true,
                                        message: "Enter email address",
                                    },
                                ]}
                                name="email"
                            >
                                <Input placeholder="example@example.com" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        pattern: new RegExp(phoneNumberRegex),
                                        message: "Enter valid Mobile Number",
                                    },
                                ]}
                                label="Mobile Number :  "
                                name="mobileNumber"
                            >
                                <Input placeholder="07x xxxx xxx" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                label="Cost :  "
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
                                        pattern: new RegExp(nicRegex),
                                        message: "Enter NIC number",
                                    },
                                ]}
                                label="NIC :  "
                                name="nic"
                                nicRegex
                            >
                                <Input placeholder="NIC" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            }
        />
    );
}

export default EditVehicleBooking;
