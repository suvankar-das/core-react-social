import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Header, List } from 'semantic-ui-react';

function App() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/activities')
            .then(response => {
                setActivities(response.data);
            })
            .catch(error => {
                console.error('Error fetching activities:', error);
            });
    }, []);

    return (
        <div>
            <Header as='h2' content="Reactivity" icon='users' />
            <List>
                {activities.map((activity) => (
                    <List.Item key={activity.id}>{activity.title}</List.Item>
                ))}
            </List>
        </div >
    );
}

export default App;
