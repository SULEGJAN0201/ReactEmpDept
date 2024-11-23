import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./component/common/Sidebar";
import Header from "./component/common/AppHeader";
import EmployeePage from "./pages/EmployeePage";
import DepartmentPage from "./pages/DepartmentPage";

const { Content } = Layout;

const App = () => {
    return (
        <Router>
            <Layout style={{ minHeight: "100vh" }}>
                <Sidebar />
                <Layout>
                    <Header />
                    <Content style={{ background: "black", padding: "30px" }}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/employees" replace />} />
                            <Route path="/employees" element={<EmployeePage />} />
                            <Route path="/departments" element={<DepartmentPage />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};

export default App;
