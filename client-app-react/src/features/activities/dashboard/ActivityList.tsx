import React from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
    const { activityStore } = useStore();
    const { GroupedActivities } = activityStore; // Assuming GroupedActivities is an array of { date, activities }

    return (
        <React.Fragment>
            {GroupedActivities.map(({ date, activities }) => (
                <React.Fragment key={date}>
                    {/* Render Date Header */}
                    <Header sub color="teal">
                        {date}
                    </Header>


                    {activities.map((activity) => (
                        <ActivityListItem activity={activity} key={activity.id} />
                    ))}

                </React.Fragment>
            ))}
        </React.Fragment>
    );
};

export default observer(ActivityList);
