import React from 'react'
import { useStore } from '../../app/stores/store'
import { observer } from 'mobx-react-lite';
import { Container, Header, Segment } from 'semantic-ui-react';

const serverError = () => {
    const { commonStore } = useStore();
    return (
        <Container>
            <Header as="h1" content="server error"></Header>
            <Header as="h5" sub color='red' content={commonStore.error?.message}></Header>

            {commonStore.error?.details && (
                <Segment>
                    <Header as="h4" content="Stack Trace" color='teal'></Header>
                    <code style={{ marginTop: "10px" }}>{commonStore.error.details}</code>
                </Segment>
            )}
        </Container>
    )
}

export default observer(serverError);
