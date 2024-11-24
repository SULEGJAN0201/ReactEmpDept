import axios from "axios";
import {API_ENDPOINTS} from "../../const/API_ENDPOINTS";

const getEmployees = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.GET_ALL_EMPLOYEES);
        return response;
    } catch (error) {
        console.error('Error fetching employees:', error);
        return error.response?.data;
    }
};

const createEmployee = async (employeeData) => {
    try {
        const payload = {
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            emailAddress: employeeData.emailAddress,
            dateOfBirth: employeeData.dateOfBirth,
            age: employeeData.age,
            salary: employeeData.salary,
            departmentId: employeeData.departmentId,
        };

        const response = await axios.post(API_ENDPOINTS.CREATE_EMPLOYEE, payload);
        return response.data;
    } catch (error) {
        console.error('Error creating employee:', error);
        return error.response?.data;
    }
};
const editEmployee = async (employeeId, employeeData) => {
    try {
        const payload = {
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            emailAddress: employeeData.emailAddress,
            dateOfBirth: employeeData.dateOfBirth,
            age: employeeData.age,
            salary: employeeData.salary,
            departmentId: employeeData.departmentId,
        };
        const response = await axios.put(API_ENDPOINTS.EDIT_EMPLOYEE(employeeId), payload);
        return response;
    }catch (error) {
        console.error('Error editing employee:', error);
        return error.response?.data;
    }
};



const deleteEmployee = async (employeeId) => {
    try {
        
        const response = await axios.delete(API_ENDPOINTS.DELETE_EMPLOYEE(employeeId));
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error deleting employee:', error);
        return error.response?.data;;
    }
};

export default {
    createEmployee,
    deleteEmployee,
    getEmployees,
    editEmployee
}