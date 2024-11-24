// import React, { useState } from "react";
// import { Drawer, Table, Popconfirm } from "antd";
// import DepartmentForm from "../component/department/DepartmentForm";
// import GradientButton from "../component/common/GradientButton";
// import {DeleteOutlined, EditOutlined, QuestionCircleOutlined} from "@ant-design/icons";
// import './PageStyles.css'

// const DepartmentPage = () => {
//     const [visible, setVisible] = useState(false);
//     const [editingDepartment, setEditingDepartment] = useState(null);

//     const [departments, setDepartments] = useState([
//         { key: 1, code: "HR001", name: "Human Resources" },
//         { key: 2, code: "IT002", name: "Information Technology" },
//         { key: 3, code: "FIN003", name: "Finance" },
//         { key: 4, code: "MK004", name: "Marketing" },
//     ]);

//     const showDrawer = () => setVisible(true);
//     const closeDrawer = () => {
//         setVisible(false);
//         setEditingDepartment(null);
//     };

//     const handleSave = (department) => {
//         if (editingDepartment) {
//             setDepartments((prev) =>
//                 prev.map((dep) =>
//                     dep.key === editingDepartment.key ? department : dep
//                 )
//             );
//         } else {
//             setDepartments((prev) => [
//                 ...prev,
//                 { ...department, key: Date.now() },
//             ]);
//         }
//         closeDrawer();
//     };

//     const handleEdit = (record) => {
//         setEditingDepartment(record);
//         showDrawer();
//     };

//     const handleDelete = (key) => {
//         setDepartments((prev) => prev.filter((dep) => dep.key !== key));
//     };

//     const columns = [
//         { title: "Department Code", dataIndex: "code" },
//         { title: "Department Name", dataIndex: "name" },
//         {
//             title: "Actions",
//             render: (_, record) => (
//                 <>
//                     <EditOutlined
//                         style={{
//                             marginRight: '10px',
//                             cursor: 'pointer',
//                             color: '#6E38E0'
//                         }}
//                         onClick={() => handleEdit(record)}
//                     />
//                     <Popconfirm
//                         title="Delete the Department"
//                         description="Are you sure to delete?"
//                         icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
//                         onConfirm={() => handleDelete(record.key)}
//                         okText="Yes"
//                         cancelText="No"
//                         okButtonProps={{
//                             style: {
//                                 background: "linear-gradient(90deg, #6E38E0, #FF5F36)",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "8px",
//                                 width: "100px",
//                             }
//                         }}
//                         cancelButtonProps={{
//                             style: {
//                                 color: "#6E38E0",
//                                 backgroundColor:"white"
//                             }
//                         }}
//                     >
//                         <DeleteOutlined
//                             style={{
//                                 cursor: 'pointer',
//                                 color: 'red'
//                             }}
//                         />
//                     </Popconfirm>
//                 </>
//             ),
//         },
//     ];

//     return (
//         <>
//             <div style={{marginBottom: "2rem", float: "right"}} className="create-button">
//                 <GradientButton name="Create Department" onClick={showDrawer}/>
//             </div>

//             <div className="responsive-table-container" style={{padding: "20px"}}>
//                 <h2 className="employee-heading" style={{color: "white"}}>Departments</h2>
//                 <div className="table-wrapper">
//                     <Table
//                         dataSource={departments}
//                         columns={columns}
//                         pagination={false}
//                         className="responsive-table"
//                     />
//                 </div>
//             </div>


//             <Drawer
//                 title={editingDepartment ? "Edit Department" : "Create Department"}
//                 open={visible}
//                 onClose={closeDrawer}
//             >
//                 <DepartmentForm
//                     initialValues={editingDepartment}
//                     onSave={handleSave}
//                     isEditing={!!editingDepartment}
//                 />

//             </Drawer>
//         </>
//     );
// };

// export default DepartmentPage;
//
import React, { useEffect, useState } from "react";
import { Drawer, Table, Popconfirm, message } from "antd";
import DepartmentForm from "../component/department/DepartmentDrawer";
import GradientButton from "../component/common/GradientButton";
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import departmentService from "../service/department/DepartmentService";
import './PageStyles.css';

const DepartmentPage = () => {
    const [visible, setVisible] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const response = await departmentService.getDepartments();
            setDepartments(response.data);
        } catch (error) {
            message.error("Failed to fetch departments.");
        } finally {
            setLoading(false);
        }
    };

    const showDrawer = () => setVisible(true);
    const closeDrawer = () => {
        setVisible(false);
        setEditingDepartment(null);
    };

    const handleSave = async (department) => {
        try {
            if (editingDepartment) {
                const response= await departmentService.editDepartment(editingDepartment.departmentId, department);
                if(response.status===200){
                    message.success("Department updated successfully.");
                }else{
                    message.error(response.message ||"Department updated failed");
                }

            } else {
                const response= await departmentService.createDepartment(department);
                if(response.status===201){
                    message.success("Department created successfully.");
                }else{
                    message.error(response.message);
                }
            }
            fetchDepartments();
        } catch (error) {
            message.error(editingDepartment ? "Failed to update department." : "Failed to create department.");
        } finally {
            closeDrawer();
        }
    };

    const handleEdit = (record) => {
        setEditingDepartment(record);
        console.log(record);
        showDrawer();
    };

    const handleDelete = async (key) => {
        try {
            const response=await departmentService.deleteDepartment(key);
            console.log(response);
            if(response.status===200){
                message.success(response ||"Department deleted successfully.");
            }else{
                 
                message.error(response)
            }
            fetchDepartments();
        } catch (error) {
            message.error("Failed to delete department.");
        }
    };

    const columns = [
        { title: "Department Code", dataIndex: "departmentCode" },
        { title: "Department Name", dataIndex: "departmentName" },
        {
            title: "Actions",
            render: (_, record) => (
                <>
                    <EditOutlined
                        style={{
                            marginRight: "10px",
                            cursor: "pointer",
                            color: "#6E38E0",
                        }}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Delete the Department"
                        description="Are you sure to delete?"
                        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                        onConfirm={() => handleDelete(record.departmentId)}
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
                <GradientButton name="Create Department" onClick={showDrawer} />
            </div>

            <div className="responsive-table-container" style={{ padding: "20px" }}>
                <h2 className="employee-heading" style={{ color: "white" }}>Departments</h2>
                <div className="table-wrapper">
                    <Table
                        dataSource={departments}
                        columns={columns}
                        pagination={false}
                        className="responsive-table"
                        loading={loading}
                    />
                </div>
            </div>

            <Drawer
                title={editingDepartment ? "Edit Department" : "Create Department"}
                open={visible}
                onClose={closeDrawer}
            >
                <DepartmentForm
                    initialValues={editingDepartment}
                    onSave={handleSave}
                    isEditing={!!editingDepartment}
                />
            </Drawer>
        </>
    );
};

export default DepartmentPage;
