import React, { useState } from "react";
import { Form, Col, Row, DatePicker } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import "./AddBanquet.css";
// import { errHandler, Notification } from "../../../../helper/helper";
import { noSplCharRegex, phoneNumberRegex } from "../../../utils/regex";
import { addBanquetDetails } from "../../../services/banquet/banquetServices";
import { banquetAddSuccess, Notification } from "../../../helper/helper";

const AddBanquet = (props) => {
    const [dateOfEvent, setDateOfEvent] = useState();
    const dateFormat = "YYYY-MM-DD";

    const {
        getBanquetDetails,
        viewData,
        setAddVisible,
        visible,
        handleOk,
        handleCancel
    } = props;

    const [form] = Form.useForm();

    let show = visible;
    form.setFieldsValue(viewData && viewData);

    const onFinish = (values) => {
        console.log("Success:", values);
        addBanquetDetails(values)
            .then((res) => {
                console.log(res);
                Notification("New Banquet Detail Added");

                setAddVisible(false);
                getBanquetDetails();
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
        setDateOfEvent(dateString);
    };

    return (
        <Modal
            title="New Banquet"
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
                    className="addBanquet"
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
                                            "Sorry you are exceeding the limit!"
                                    },

                                    {
                                        pattern: new RegExp(noSplCharRegex),
                                        message: "Enter valid Name"
                                    }
                                ]}
                                label="Guest Name :  "
                                name="guestName"
                            >
                                <Input placeholder="Guest Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        pattern: new RegExp(phoneNumberRegex),
                                        message: "Enter valid Mobile Number"
                                    }
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
                                rules={[
                                    {
                                        max: 30,
                                        message:
                                            "Sorry you are exceeding the limit!"
                                    },

                                    {
                                        pattern: new RegExp(noSplCharRegex),
                                        message: "Enter valid Event Type"
                                    }
                                ]}
                                label="Event Type :  "
                                name="eventType"
                            >
                                <Input placeholder="Event Type" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        max: 100,
                                        message:
                                            "Sorry you are exceeding the limit!"
                                    }
                                ]}
                                label="Additional Service :  "
                                name="additionalService"
                            >
                                <Input placeholder="Additional Service" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        max: 30,
                                        message:
                                            "Sorry you are exceeding the limit!"
                                    }
                                ]}
                                label="Decorations :  "
                                name="decoration"
                            >
                                <Input placeholder="Decorations" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: "Select date Of the Event"
                                    }
                                ]}
                                label="Event Date :  "
                                name="dateOfEvent"
                            >
                                <DatePicker
                                    allowClear={true}
                                    onChange={dateOnChange}
                                    placeholder="Event Date"
                                    showNow={true}
                                    disabledTime={true}
                                    format={dateFormat}
                                    inputReadOnly={true}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            }
        />
    );
};

export default AddBanquet;
