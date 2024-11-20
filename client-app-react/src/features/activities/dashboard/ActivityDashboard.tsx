import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";


interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    handleSelectedActivity: (id: string) => void;
    cancelSelectedActivity: () => void;
    editMode: boolean;
    handleFormOpen: (id: string) => void;
    handleFormClose: () => void;
    upsertActivity: (activity: Activity) => void;
    handleDeleteActivity: (id: string) => void;
    submitting: boolean

}



const ActivityDashboard = ({ activities, selectedActivity, handleSelectedActivity,
    cancelSelectedActivity, handleFormOpen, handleFormClose, upsertActivity, handleDeleteActivity,
    submitting, editMode }: Props) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} handleSelectedActivity={handleSelectedActivity} handleDeleteActivity={handleDeleteActivity} submitting={submitting}></ActivityList>
            </Grid.Column>
            <Grid.Column width={6}>
                {
                    selectedActivity && !editMode &&

                    <ActivityDetails selectedActivity={selectedActivity}
                        cancelSelectedActivity={cancelSelectedActivity}
                        handleFormOpen={handleFormOpen}
                    />
                }
                {editMode && <ActivityForm handleFormClose={handleFormClose} selectedActivity={selectedActivity} upsertActivity={upsertActivity} submitting={submitting} />}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;
