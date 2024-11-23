import React, { useEffect } from "react";
import { Form, Input, DatePicker, InputNumber, Select } from "antd";
import moment from "moment";
import GradientButton from "../common/GradientButton";

const EmployeeForm = ({ initialValues, onSave, departments, isEditing }) => {
    const [form] = Form.useForm();

    const calculateAge = (dob) => {
        const diff = new Date() - new Date(dob).getTime();
        return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
    };

    const disabledDate = (current) => {
        return current && current.isAfter(moment().endOf('day'));
    };

    const onDobChange = (dob) => {
        if (dob) {
            const age = calculateAge(dob.toDate());
            form.setFieldsValue({ age });
        }
    };

    const onFinish = (values) => {
        const formattedValues = {
            ...values,
            dob: values.dob ? values.dob.toDate() : null, // Convert moment to plain date
        };
        const age = calculateAge(formattedValues.dob);
        onSave({ ...formattedValues, age });
    };

    useEffect(() => {
        if (initialValues) {
            const formattedInitialValues = {
                ...initialValues,
                dob: initialValues.dob ? moment(initialValues.dob) : null, // Convert dob to moment
            };
            form.setFieldsValue(formattedInitialValues);
        }
    }, [initialValues, form]);

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={onFinish}
            className="employee-form"
        >
            <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                    { required: true, message: "First Name is required" },
                    { pattern: /^[A-Za-z]+$/, message: "First name should only contain alphabets" },
                ]}
            >
                <Input placeholder="Enter employee first name" />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                    { required: true, message: "Last Name is required" },
                    { pattern: /^[A-Za-z]+$/, message: "Last name should only contain alphabets" },
                ]}
            >
                <Input placeholder="Enter employee last name" />
            </Form.Item>

            <Form.Item
                label="Email Address"
                name="email"
                rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Please enter a valid email" },
                ]}
            >
                <Input placeholder="Enter employee email address" />
            </Form.Item>

            <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[{ required: true, message: "Date of Birth is required" }]}
            >
                <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Select employee date of birth"
                    disabledDate={disabledDate}
                    onChange={onDobChange}
                />
            </Form.Item>

            <Form.Item
                label="Salary"
                name="salary"
                rules={[{ required: true, message: "Salary is required" }]}

            >
                <InputNumber style={{ width: "100%" }} min={0}  placeholder="Enter employee salary" />
            </Form.Item>

            <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: "Department is required" }]}
            >
                <Select placeholder="Select employee department">
                    {departments.map((dept) => (
                        <Select.Option key={dept.key} value={dept.name}>
                            {dept.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <GradientButton
                    name={isEditing ? "Update Employee" : "Create Employee"}
                    onClick={() => form.submit()}
                    width="100%"
                />
            </Form.Item>
        </Form>
    );
};

export default EmployeeForm;
