import { useEffect } from "react";

import {
    Grid,
} from 'semantic-ui-react'
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";




const ActivityDetails = () => {

    const { activityStore } = useStore();
    const { selectedActivity, loadSingleActivity } = activityStore;

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadSingleActivity(id);
        }
    }, [id, loadSingleActivity])

    if (!selectedActivity) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailsHeader activity={selectedActivity} />
                <ActivityDetailsInfo activity={selectedActivity} />
                <ActivityDetailsChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailsSidebar />

            </Grid.Column>
        </Grid>
    )
}


export default observer(ActivityDetails);
