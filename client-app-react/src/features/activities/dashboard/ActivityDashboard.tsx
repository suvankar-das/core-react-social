import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";


const ActivityDashboard = () => {
    const { activityStore } = useStore();
    const { activities } = activityStore;

    useEffect(() => {
        if (activities.length <= 0) {
            activityStore.loadActivities();
        }

    }, [activityStore]);

    if (activityStore.loading) return <LoadingComponent content='Sit tight ..' isLoading={activityStore.loading} />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity Filter</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);
