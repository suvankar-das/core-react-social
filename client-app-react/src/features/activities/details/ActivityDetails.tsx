import React from "react";

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


interface Props {
    selectedActivity: Activity;
    cancelSelectedActivity: () => void;
    handleFormOpen: (id: string) => void;

}

const ActivityDetails = ({ selectedActivity, cancelSelectedActivity, handleFormOpen }: Props) => {
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
                    <Button basic color="grey" onClick={() => cancelSelectedActivity()}>Cancel</Button>
                </Button.Group>
            </CardContent>
        </Card>
    )
}


export default ActivityDetails;
