import React from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
    activities: Activity[];
    handleSelectedActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
}

const ActivityList = ({ activities, handleSelectedActivity, handleDeleteActivity }: Props) => {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as="a">
                                {activity.title}
                            </Item.Header>
                            <Item.Meta>
                                {activity.date}
                            </Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>

                            <Item.Extra>
                                <Button floated="right" content="view" color="blue" onClick={() => handleSelectedActivity(activity.id)} />
                                <Button floated="right" content="Delete" color="red" onClick={() => handleDeleteActivity(activity.id)} />
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
};



export default ActivityList;
