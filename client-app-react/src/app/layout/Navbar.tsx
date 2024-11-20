import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
    handleFormOpen: () => void
}

const Navbar = ({ handleFormOpen }: Props) => {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="../../assets/logo.png" alt="logo" style={{ marginRight: '10px' }}></img>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button onClick={() => handleFormOpen()} positive content="Activity"></Button>
                </Menu.Item>
            </Container>
        </Menu>

    )
}


export default Navbar;
