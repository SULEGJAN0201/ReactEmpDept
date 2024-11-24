import React, { useEffect, useState } from "react";
import { Drawer, Table, Popconfirm, message ,Form } from "antd";
import EmployeeForm from "../component/employee/EmployeeDrawer";
import GradientButton from "../component/common/GradientButton";
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import employeeService from "../service/employee/EmployeeService";
import departmentService from "../service/department/DepartmentService";
import "./PageStyles.css";

const EmployeePage = () => {
    const [visible, setVisible] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await employeeService.getEmployees();
            if(response.status === 200) {
                setEmployees(response.data);
            }else{
                message.error(response || "Failed to fetch employees.");
                setEmployees([]);
            }

        } catch (error) {
            message.error("Failed to fetch employees.");
        } finally {
            setLoading(false);
        }
    };

  

    const fetchDepartments = async () => {
        try {
            const response = await departmentService.getDepartments();
            if (response.status === 200) {
                console.log("Departments fetched:", response.data);
                setDepartments(response.data);
                console.log(departments);
            } else {
                message.error(response || "Failed to fetch departments.");
                setDepartments([]);
            }
        } catch (error) {
            message.error("Failed to fetch departments.");
        }
    };
     
    const showDrawer = () => {
        if (!editingEmployee) {
            form.resetFields(); // Reset form fields for creating a new employee
        }
        setVisible(true);
    };
    
    const closeDrawer = () => {
        setVisible(false);
        setEditingEmployee(null);
    };

    const handleSave = async (employee) => {
        try {
            if (editingEmployee) {
                const response= await employeeService.editEmployee(editingEmployee.employeeId, employee);
                if(response.status===200){
                    message.success(response ||"Employee updated successfully.");
                }else{
                    message.error(response ||"Failed to update employees.");
                }
            } else {
                const response= await employeeService.createEmployee(employee);
                if(response.status===201){
                    message.success(response || "Employee created successfully.");
                }else{
                    message.error(response ||"Failed to create employees.");
                }
            }
            fetchEmployees();
        } catch (error) {
            message.error(editingEmployee ? "Failed to update employee." : "Failed to create employee.");
        } finally {
            closeDrawer();
        }
    };

    const handleEdit = (record) => {
        console.log(record);

        setEditingEmployee({
            ...record,
            dateOfBirth: record.dateOfBirth ? moment(record.dateOfBirth) : null,
        });
        showDrawer();
    };

    const handleDelete = async (key) => {
        try {
            const response = await employeeService.deleteEmployee(key);
            if(response.status===200){
                console.log(response);
                message.success(response.data ||"Employee deleted successfully.");
            }else{
                message.error(response || "Failed to delete employee.");
            }
            fetchEmployees();
        } catch (error) {
            message.error("Failed to delete employee.");
        }
    };

    const columns = [
        { title: "First Name", dataIndex: "firstName" },
        { title: "Last Name", dataIndex: "lastName" },
        { title: "Email", dataIndex: "emailAddress" },
        { title: "Age", dataIndex: "age" },
        { title: "DoB", dataIndex: "dateOfBirth" },
        { title: "Salary", dataIndex: "salary" },
        { title: "Department", dataIndex: "departmentId" },
        {
            title: "Actions",
            render: (_, record) => (
                <>
                    <EditOutlined
                        className="editIcon"
                        style={{
                            marginRight: "10px",
                            cursor: "pointer",
                            color: "#6E38E0",
                        }}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Delete the Employee"
                        description="Are you sure to delete?"
                        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                        onConfirm={() => handleDelete(record.employeeId)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{
                            style: {
                                background: "linear-gradient(90deg, #6E38E0, #FF5F36)",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                width: "100px",
                            },
                        }}
                        cancelButtonProps={{
                            style: {
                                color: "#6E38E0",
                                backgroundColor: "white",
                            },
                        }}
                    >
                        <DeleteOutlined
                            className="deleteIcon"
                            style={{
                                cursor: "pointer",
                                color: "red",
                            }}
                        />
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <>
            <div style={{ marginBottom: "2rem", float: "right" }} className="create-button">
                <GradientButton name="Create Employee" onClick={showDrawer} />
            </div>

            <div className="responsive-table-container" style={{ padding: "20px" }}>
                <h2 className="department-heading" style={{ color: "white" }}>Employees</h2>
                <div className="table-wrapper">
                    <Table
                        dataSource={employees}
                        columns={columns}
                        pagination={false}
                        className="responsive-table"
                        loading={loading}
                    />
                </div>
            </div>

            <Drawer
                title={editingEmployee ? "Edit Employee" : "Create Employee"}
                open={visible}
                onClose={closeDrawer}
            >
                <EmployeeForm
                    initialValues={editingEmployee}
                    onSave={handleSave}
                    departments={departments}
                    isEditing={!!editingEmployee}
                />
            </Drawer>
        </>
    );
};

export default EmployeePage;
