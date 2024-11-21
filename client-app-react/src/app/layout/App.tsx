import { useEffect, useState } from 'react';
import { Button, Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import './styles.css';
import React from 'react';
import ActivityDashboard from '../../features/activities/dashboard/activitydashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {

    const { activityStore } = useStore();



    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);



    const handleSelectedActivity = (id: string) => {
        setSelectedActivity(activities.find(x => x.id === id));
    }

    const handleCancelAcivity = () => {
        setSelectedActivity(undefined)
    }

    const handleFormOpen = (id?: string) => {
        if (id) {
            handleSelectedActivity(id);

        } else {
            handleCancelAcivity();
        }

        setEditMode(true);
    }


    const handleFormClose = () => {
        setEditMode(false);
    }

    const upsertActivity = async (activity: Activity) => {
        setSubmitting(true);
        if (activity.id) {
            await agent.Activities.update(activity);
            setActivities([...activities.filter(x => x.id !== activity.id), activity]);
            setEditMode(false);
            setSelectedActivity(activity);
            setSubmitting(false);

        } else {
            activity.id = uuid();
            await agent.Activities.create(activity);
            setActivities([...activities, activity]);

            setEditMode(false);
            setSelectedActivity(activity);
            setSubmitting(false);
        }


    };



    const handleDeleteActivity = async (id: string) => {
        setSubmitting(true);
        await agent.Activities.delete(id);
        setActivities([...activities.filter(x => x.id !== id)]);
        setSubmitting(false);
    }


    useEffect(() => {
        agent.Activities.list().then(response => {
            let formattedDateActivities: Activity[] = [];
            response.forEach(act => {
                act.date = act.date.split('T')[0];
                formattedDateActivities.push(act);
            });
            setActivities(formattedDateActivities);
        })
            .catch(error => {
                console.error('Error fetching activities:', error);
            });


    }, []);

    if (loading) return <LoadingComponent content='Sit tight ..' isLoading={loading} />

    return (
        <React.Fragment>
            <Navbar handleFormOpen={handleFormOpen} />
            <Container style={{ marginTop: '7em' }} >
                <h2>{activityStore.title}</h2>
                <Button content="Test Mobx Action" positive onClick={() => activityStore.setTitle(Math.random().toString())}></Button>
                <ActivityDashboard activities={activities}
                    selectedActivity={selectedActivity}
                    handleSelectedActivity={handleSelectedActivity}
                    cancelSelectedActivity={handleCancelAcivity}
                    editMode={editMode}
                    handleFormOpen={handleFormOpen}
                    handleFormClose={handleFormClose}
                    upsertActivity={upsertActivity}
                    handleDeleteActivity={handleDeleteActivity}
                    submitting={submitting}

                ></ActivityDashboard>
            </Container>

        </React.Fragment >
    );
}

export default observer(App);
