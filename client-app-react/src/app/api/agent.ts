import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";

// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:5000/api';

// Utility function to extract the response body
const responseBody = <T>(response: AxiosResponse<T>) => {
    return response.data;
}


axios.interceptors.response.use(async response => {
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
        case 400:
            // for guid
            if (config.method === "get" && data.errors.hasOwnProperty("Id")) {
                router.navigate("/not-found")
            }
            if (data.errors) {
                const modelStateError = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateError.push(data.errors[key]);
                    }
                }
                throw modelStateError.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error("Unauthorized");
            break;
        case 403:
            toast.error("Forbidden");
            break;
        case 404:
            router.navigate("/not-found")
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate("/server-error");
            break;
    }
    return Promise.reject(error);
});


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
