import React from "react";
import { Form, Col, Row } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import "./AddBanquet.css";
import { noSplCharRegex, phoneNumberRegex } from "../../../utils/regex";
import { updateBanquet } from "../../../services/banquet/banquetServices";
import { banquetUpdateSuccess } from "../../../helper/helper";

function EditBanquet(props) {
    const {
        editData,
        setEditVisible,
        visible,
        handleOk,
        handleCancel,
        getBanquetDetails,
    } = props;
    const [form] = Form.useForm();
    let show = visible;

    form.setFieldsValue(editData && editData);

    const onFinish = (values) => {
        console.log("Success:", values);
        updateBanquet(values)
            .then((res) => {
                console.log(res);

                form.resetFields();
                banquetUpdateSuccess();

                getBanquetDetails();
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
            title="Edit Banquet"
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
                                label="Banquet ID"
                                hidden={true}
                                name="id"
                            >
                                <Input
                                    disabled={true}
                                    style={{ width: "70%" }}
                                    placeholder="Banquet Id"
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
                                rules={[
                                    {
                                        max: 30,
                                        message:
                                            "Sorry you are exceeding the limit!",
                                    },

                                    {
                                        pattern: new RegExp(noSplCharRegex),
                                        message: "Enter valid Event Type",
                                    },
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
                                            "Sorry you are exceeding the limit!",
                                    },
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
                                            "Sorry you are exceeding the limit!",
                                    },
                                ]}
                                label="Decorations :  "
                                name="decoration"
                            >
                                <Input placeholder="Decorations" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            }
        />
    );
}

export default EditBanquet;
