const BASE_URL = 'https://localhost:7135/api';

export const API_ENDPOINTS = {
    GET_ALL_EMPLOYEES: `${BASE_URL}/Employee`,
    CREATE_EMPLOYEE: `${BASE_URL}/Employee`,
    EDIT_EMPLOYEE:(id)=> `${BASE_URL}/Employee/${id}`,
    DELETE_EMPLOYEE:(id)=> `${BASE_URL}/Employee/${id}`,
    GET_ALL_DEPARTMENTS: `${BASE_URL}/Department/`,
    CREATE_DEPARTMENT: `${BASE_URL}/Department`,
    EDIT_DEPARTMENT:(id)=> `${BASE_URL}/Department/${id}`,
    DELETE_DEPARTMENT:(id)=> `${BASE_URL}/Department/${id}`,

};