import React, { useState } from "react";

import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
    Button,
} from 'semantic-ui-react'
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";




const ActivityDetails = () => {

    const { activityStore } = useStore();
    const { selectedActivity, handleFormOpen, handleCancelAcivity } = activityStore;

    if (!selectedActivity) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
            <CardContent>
                <CardHeader>{selectedActivity.title}</CardHeader>
                <CardMeta>
                    <span>{selectedActivity.date}</span>
                </CardMeta>
                <CardDescription>
                    {selectedActivity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button basic color="blue" onClick={() => handleFormOpen(selectedActivity.id)}>Edit</Button>
                    <Button basic color="grey" onClick={() => handleCancelAcivity()}>Cancel</Button>
                </Button.Group>
            </CardContent>
        </Card>
    )
}


export default ActivityDetails;
