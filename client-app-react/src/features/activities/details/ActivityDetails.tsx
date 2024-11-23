import React, { useEffect, useState } from "react";

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
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";




const ActivityDetails = () => {

    const { activityStore } = useStore();
    const { selectedActivity, loadSingleActivity, loading } = activityStore;

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadSingleActivity(id);
        }
    }, [id, loadSingleActivity])

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
                    <Button basic color="blue" as={Link} to={`/manage/${selectedActivity.id}`}>Edit</Button>
                    <Button basic color="grey" as={Link} to="/activities">Cancel</Button>
                </Button.Group>
            </CardContent>
        </Card>
    )
}


export default observer(ActivityDetails);
