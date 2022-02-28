import React from 'react';
import ReactDOM from 'react-dom';
import {
	Container,
	Button,
	Nav,
	Navbar,
	NavDropdown
} from 'react-bootstrap';
import './Header.css';
class Header extends React.Component
{
	render()
  	{
    	return (
    		<header className="gateway-header">
				<Navbar expand="lg">
				  <Container>
				    <Navbar.Brand href="/"><img src="/common/gateway-logo.svg" /></Navbar.Brand>
				    <Navbar.Toggle aria-controls="basic-navbar-nav" />
				    <Navbar.Collapse id="basic-navbar-nav">
				      <Nav className="me-auto">
				        <Nav.Link href="#home">What We Do</Nav.Link>
				        <Nav.Link href="#link">What are DAOs?</Nav.Link>
				        <Nav.Link href="#link">Add Your Comunity</Nav.Link>
				        <Nav.Link className="last-nav-item" href="#link">connect wallet</Nav.Link>
				      </Nav>
				    </Navbar.Collapse>
				  </Container>
				</Navbar>
    		</header>
    	)
    }
}

export default Header;