import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import './styles.css';
import React from 'react';
import ActivityDashboard from '../../features/activities/dashboard/activitydashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
    const { activityStore } = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loading) return <LoadingComponent content='Sit tight ..' isLoading={activityStore.loading} />

    return (
        <React.Fragment>
            <Navbar />
            <Container style={{ marginTop: '7em' }} >
                <ActivityDashboard></ActivityDashboard>
            </Container>

        </React.Fragment >
    );
}

export default observer(App);
