import React from "react";
import { Form, Col, Row } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import "./Transport.css";
import { noSplCharRegex, priceRegex } from "../../../utils/regex";
import { addTransport } from "../../../services/Transport/transportServices";
import { Notification } from "../../../helper/helper";

const AddTransport = (props) => {
    const {
        getTransportDetails,
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
        addTransport(values)
            .then((res) => {
                console.log(res);
                Notification("New Transport Detail Added");

                setAddVisible(false);
                getTransportDetails();
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
            title="New Transport Detail"
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
};

export default AddTransport;
