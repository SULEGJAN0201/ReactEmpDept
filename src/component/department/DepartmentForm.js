import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import GradientButton from "../common/GradientButton";

const DepartmentForm = ({ initialValues, onSave, isEditing }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isEditing && initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [isEditing, initialValues, form]);

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={onSave}
            className="department-form"
        >
            <Form.Item
                label="Department Code"
                name="code"
                rules={[{ required: true, message: "Department Code is required" }]}
            >
                <Input placeholder="Enter department code" />
            </Form.Item>

            <Form.Item
                label="Department Name"
                name="name"
                rules={[{ required: true, message: "Department Name is required" }]}
            >
                <Input placeholder="Enter department name" />
            </Form.Item>

            <Form.Item
                label="Department Description"
                name="description"
            >
                <Input.TextArea placeholder="Enter a brief description of the department" />
            </Form.Item>

            <Form.Item
                label="Department Manager"
                name="manager"
                rules={[{ required: true, message: "Department Manager is required" }]}
            >
                <Select placeholder="Select a manager">
                    <Select.Option value="manager1">Manager 1</Select.Option>
                    <Select.Option value="manager2">Manager 2</Select.Option>
                    <Select.Option value="manager3">Manager 3</Select.Option>
                </Select>
            </Form.Item>


            <Form.Item>
                <GradientButton
                    name={isEditing ? "Update Department" : "Create Department"}
                    onClick={() => form.submit()}
                    width="100%"
                />
            </Form.Item>
        </Form>
    );
};

export default DepartmentForm;
