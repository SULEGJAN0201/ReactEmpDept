import axios from "axios";
import {API_ENDPOINTS} from "../../const/API_ENDPOINTS";

const getDepartments = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.GET_ALL_DEPARTMENTS);
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};


const createDepartment = async (departmentData) => {
    try {
        const payload = {
            departmentCode: departmentData.code,
            departmentName: departmentData.name,
        };
        const response = await axios.post(API_ENDPOINTS.CREATE_DEPARTMENT, payload);
        return response.data;
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
};

const editDepartment = async (departmentId, departmentData) => {
    try {
        const payload = {
            departmentCode: departmentData.code,
            departmentName: departmentData.name,
        };
        const response = await axios.put(`${API_ENDPOINTS.EDIT_DEPARTMENT}/${departmentId}`, payload);
        return response.data;
    } catch (error) {
        console.error('Error editing department:', error);
        throw error;
    }
};

// const createDepartment = async (departmentData) => {
//     try {
//         const response = await axios.post(API_ENDPOINTS.CREATE_DEPARTMENT, departmentData);
//         return response.data;
//     } catch (error) {
//         console.error('Error creating department:', error);
//         throw error;
//     }
// };

// const editDepartment = async (departmentId, departmentData) => {
//     try {
//         const response = await axios.put(`${API_ENDPOINTS.EDIT_DEPARTMENT}/${departmentId}`, departmentData);
//         return response.data;
//     } catch (error) {
//         console.error('Error editing department:', error);
//         throw error;
//     }
// };

const deleteDepartment = async (departmentId) => {
    try {
        const response = await axios.delete(`${API_ENDPOINTS.DELETE_DEPARTMENT}/${departmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting department:', error);
        throw error;
    }
};

export default {
    deleteDepartment,
    editDepartment,
    getDepartments,
    createDepartment
}