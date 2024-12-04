import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import Activitydashboard from "../../features/activities/dashboard/activitydashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestErrors";
import Notfound from "../../features/errors/Notfound";
import ServerError from "../../features/errors/serverError";


export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: 'activities',
                element: <Activitydashboard />
            },
            {
                path: 'activities/:id',
                element: <ActivityDetails />
            },
            {
                path: 'createActivity',
                element: <ActivityForm />
            },

            /*else after click on edit , if I click on create , it will preserve the data , so to clear the form */

            {
                path: 'manage/:id',
                element: <ActivityForm key="manage" />
            },

            {
                path: 'errors',
                element: <TestErrors />
            },
            {
                path: 'not-found',
                element: <Notfound />
            },
            {
                path: 'server-error',
                element: <ServerError />
            },
            {
                path: '*',
                element: <Navigate replace to="/not-found" />
            },
        ]
    },

]

export const router = createBrowserRouter(routes);
