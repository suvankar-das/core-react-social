import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';



const ActivityForm = () => {

    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadSingleActivity } = activityStore;

    const { id } = useParams();

    const navigate = useNavigate();

    const [activityValue, setActivityValue] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        city: '',
        date: '',
        description: '',
        venue: '',
    });

    useEffect(() => {
        console.log('act form', activityValue, id);

        const fetchData = async () => {
            if (id) {
                debugger
                const act = await loadSingleActivity(id);
                setActivityValue(act!);
            }
        };

        fetchData();
    }, [id, loadSingleActivity]);

    const changeActivityData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivityValue({ ...activityValue, [name]: value });
    };


    // after submitting , redirect user to the details of that activity
    const submitActivity = async () => {

        if (!activityValue.id) {
            activityValue.id = uuid();

            await createActivity(activityValue);
            navigate(`/activities/${activityValue.id}`);
        } else {
            await updateActivity(activityValue);
            navigate(`/activities/${activityValue.id}`);
        }
    };

    if (!activityValue) return <LoadingComponent content="loading activity..."></LoadingComponent>

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
                <Button floated="right" type="button" content="Cancel" as={Link} to="/activities" />
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);
