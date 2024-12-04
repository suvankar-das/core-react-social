import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import './styles.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';


function App() {

    const urlPath = useLocation();



    return (
        <React.Fragment>
            <ToastContainer position='bottom-right' hideProgressBar theme='colored'></ToastContainer>
            {urlPath.pathname === '/' ? <HomePage /> : <>
                <Navbar />
                <Container style={{ marginTop: '7em' }} >
                    <Outlet />
                </Container>
            </>}
        </React.Fragment >
    );
}

export default observer(App);
