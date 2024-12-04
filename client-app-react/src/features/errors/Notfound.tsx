import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Segment, Icon, Button } from 'semantic-ui-react'

const Notfound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search"></Icon>
                Not found the content you are looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/activities">Return to Activities</Button>
            </Segment.Inline>
        </Segment>

    )
}

export default Notfound
