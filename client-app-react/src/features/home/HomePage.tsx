import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react"

const HomePage = () => {
    return (
        <Container style={{ marginTop: '7em' }}>
            <h1>Home Page</h1>
            <h2>Go to <Link to="/activities">Activity</Link></h2>
        </Container>
    )
}


export default HomePage;
