const BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
    GET_ALL_EMPLOYEES: `${BASE_URL}/employees`,
    CREATE_EMPLOYEE: `${BASE_URL}/employees`,
    EDIT_EMPLOYEE:(id)=> `${BASE_URL}/employees/${id}`,
    DELETE_EMPLOYEE:(id)=> `${BASE_URL}/employees/${id}`,
    GET_ALL_DEPARTMENTS: `${BASE_URL}/departments/`,
    CREATE_DEPARTMENT: `${BASE_URL}/departments`,
    EDIT_DEPARTMENT:(id)=> `${BASE_URL}/departments/${id}`,
    DELETE_DEPARTMENT:(id)=> `${BASE_URL}/departments/${id}`,

};