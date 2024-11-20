import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import './styles.css';
import React from 'react';
import ActivityDashboard from '../../features/activities/dashboard/activitydashboard';
import { v4 as uuid } from 'uuid';


function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);



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

    const upsertActivity = (activity: Activity) => {
        activity.id ? setActivities([...activities.filter(x => x.id != activity.id), activity])
            : setActivities([...activities, { ...activity, id: uuid() }]);

        setEditMode(false);
        setSelectedActivity(activity);
    }


    const handleDeleteActivity = (id: string) => {
        setActivities([...activities.filter(x => x.id !== id)]);
    }


    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities')
            .then(response => {
                setActivities(response.data);
            })
            .catch(error => {
                console.error('Error fetching activities:', error);
            });
    }, []);

    return (
        <React.Fragment>
            <Navbar handleFormOpen={handleFormOpen} />
            <Container style={{ marginTop: '7em' }} >

                <ActivityDashboard activities={activities}
                    selectedActivity={selectedActivity}
                    handleSelectedActivity={handleSelectedActivity}
                    cancelSelectedActivity={handleCancelAcivity}
                    editMode={editMode}
                    handleFormOpen={handleFormOpen}
                    handleFormClose={handleFormClose}
                    upsertActivity={upsertActivity}
                    handleDeleteActivity={handleDeleteActivity}

                ></ActivityDashboard>
            </Container>

        </React.Fragment >
    );
}

export default App;
