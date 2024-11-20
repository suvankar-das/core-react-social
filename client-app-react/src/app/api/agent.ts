import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:5000/api';

// Utility function to extract the response body
const responseBody = <T>(response: AxiosResponse<T>) => {
    return response.data;
}

// Define the request methods
const request = {
    get: <T>(url: string) => {
        return axios.get<T>(url).then(responseBody);
    },
    post: <T>(url: string, body: {}) => {
        return axios.post<T>(url, body).then(responseBody);
    },
    put: <T>(url: string, body: {}) => {
        return axios.put<T>(url, body).then(responseBody);
    },
    del: <T>(url: string) => {
        return axios.delete<T>(url).then(responseBody);
    },
};

// Define the Activities object
const Activities = {
    list: () => {
        return request.get<Activity[]>('/activities');
    },

    details: (id: string) => {
        return request.get<Activity>(`/activities/${id}`)
    },

    create: (activity: Activity) => {
        return request.post<void>('/activities', activity);
    },
    update: (activity: Activity) => {
        return request.put<void>(`/activities/${activity.id}`, activity);
    },
    delete: (id: string) => {
        return request.del<void>(`/activities/${id}`)
    }
};

// Define the agent object
const agent = {
    Activities,
};

export default agent;
