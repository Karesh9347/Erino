import React, { useState } from 'react';
import { Navbar, Nav, Button, Offcanvas, Container, NavDropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navb() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" sticky="top" className="bg-body-tertiary mb-1">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
          <img src='https://erino.io/wp-content/uploads/2024/07/Final-Logo.svg' alt='logo' width={120} height={120} style={{margin:"-20px 0"}}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow}>
           
          </Navbar.Toggle>

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
              <img src='https://erino.io/wp-content/uploads/2024/07/Final-Logo.svg' alt='logo' width={120} height={120} style={{margin:"-30px 0"}}/>
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/add-contact" style={{fontWeight:"bold",fontSize:"20px",fontStyle:"oblique"}}>Add Contact</Nav.Link>
                <Nav.Link as={Link} to="/remove-contact" style={{fontWeight:"bold",fontSize:"20px",fontStyle:"oblique"}}>Remove Contact</Nav.Link>
                <Nav.Link as={Link} to="/update-contact" style={{fontWeight:"bold",fontSize:"20px",fontStyle:"oblique"}}>Update Contact</Nav.Link>
                <Nav.Link as={Link} to="/all-contacts" style={{fontWeight:"bold",fontSize:"20px",fontStyle:"oblique"}}>All Contacts</Nav.Link>
               
              </Nav>
              <br />
              <br />
              <Nav>
                <Button href='https://erino.io/contact/' style={{fontWeight:"bold",fontSize:"20px",fontStyle:"oblique"}}>Try Erino Free</Button>
              </Nav>

            
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Navb;
