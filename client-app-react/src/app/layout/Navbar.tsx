import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";


const Navbar = () => {

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to="/" header>
                    <img src="../../assets/logo.png" alt="logo" style={{ marginRight: '10px' }}></img>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" as={NavLink} to="/activities" />
                <Menu.Item>
                    <Button as={NavLink} to="/createActivity" positive content="Activity"></Button>
                </Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to="/errors" content="Errors"></Button>
                </Menu.Item>
            </Container>
        </Menu>

    )
}


export default Navbar;


