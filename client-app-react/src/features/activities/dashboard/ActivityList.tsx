import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


const ActivityList = () => {

    const { activityStore } = useStore();
    const { activities, handleSelectedActivity, handleDeleteActivity, submitting } = activityStore;

    // because react will show loading wheel to all delete button
    // so to show loading only with current delete button


    const [targetDeleteButton, setTargetDeleteButton] = useState('');

    const showProperLoadingWhileDeletion = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTargetDeleteButton(event.currentTarget.name);
        handleDeleteActivity(id);
    }

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
                                <Button floated="right" content="view" color="blue"
                                    onClick={() => handleSelectedActivity(activity.id)} />

                                <Button
                                    name={activity.id}
                                    loading={submitting && targetDeleteButton === activity.id}
                                    floated="right"
                                    content="Delete"
                                    color="red"
                                    onClick={(e) => showProperLoadingWhileDeletion(e, activity.id)} />
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
};



export default observer(ActivityList);
