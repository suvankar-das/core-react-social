import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";



const ActivityForm = () => {

    const { activityStore } = useStore();
    const { selectedActivity, handleFormClose, createActivity, updateActivity, loading } = activityStore;

    const initialState: Activity = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        city: '',
        date: '',
        description: '',
        venue: '',
    };

    const [activityValue, setActivityValue] = useState(initialState);

    const changeActivityData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivityValue({ ...activityValue, [name]: value });
    };

    const submitActivity = () => {
        activityValue.id ? updateActivity(activityValue) : createActivity(activityValue);
    };

    return (
        <Segment clearing>
            <Form autoComplete="off" onSubmit={submitActivity}>
                <Form.Input
                    placeholder="Title"
                    name="title"
                    value={activityValue.title}
                    onChange={changeActivityData}
                />
                <Form.TextArea
                    placeholder="Description"
                    name="description"
                    value={activityValue.description}
                    onChange={changeActivityData}
                />
                <Form.Input
                    placeholder="Category"
                    name="category"
                    value={activityValue.category}
                    onChange={changeActivityData}
                />
                <Form.Input
                    type="date"
                    placeholder="Date"
                    name="date"
                    value={activityValue.date}
                    onChange={changeActivityData}
                />
                <Form.Input
                    placeholder="City"
                    name="city"
                    value={activityValue.city}
                    onChange={changeActivityData}
                />
                <Form.Input
                    placeholder="Venue"
                    name="venue"
                    value={activityValue.venue}
                    onChange={changeActivityData}
                />

                <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                <Button floated="right" type="button" content="Cancel" onClick={handleFormClose} />
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);
