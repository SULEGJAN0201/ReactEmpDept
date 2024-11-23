import axios from "axios";
import {API_ENDPOINTS} from "../../const/API_ENDPOINTS";

const getEmployees = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.GET_ALL_EMPLOYEES);
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post(API_ENDPOINTS.CREATE_EMPLOYEE, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
};

const editEmployee = async (employeeId, employeeData) => {
    try {
        const response = await axios.put(`${API_ENDPOINTS.EDIT_EMPLOYEE}/${employeeId}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error editing employee:', error);
        throw error;
    }
};

const deleteEmployee = async (employeeId) => {
    try {
        const response = await axios.delete(`${API_ENDPOINTS.DELETE_EMPLOYEE}/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};

export default {
    createEmployee,
    deleteEmployee,
    getEmployees,
    editEmployee
}