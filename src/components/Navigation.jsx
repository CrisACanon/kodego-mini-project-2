import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "../routes";

const Navigation = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  function changePage(path) {
    setShow(false);
    navigate(path);
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">E-Commerce Website</Navbar.Brand>
          <Navbar.Toggle
            className="d-block d-md-none"
            onClick={() => setShow(true)}
          />
          <Nav className="d-none d-md-flex gap-2 flex-row">
            {routes
              .filter((route) => route.forNavbar)
              .map((route, index) => {
                return (
                  <Nav.Link key={index} as={Link} to={route.path}>
                    {route.name}
                  </Nav.Link>
                );
              })}
          </Nav>
        </Container>
      </Navbar>
      <Offcanvas
        show={show}
        placement="end"
        onHide={() => setShow(false)}
        data-bs-theme="dark"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>LOGO</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {routes.map((route, index) => {
              return (
                <Nav.Link key={index} onClick={() => changePage(route.path)}>
                  {route.name}
                </Nav.Link>
              );
            })}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigation;
