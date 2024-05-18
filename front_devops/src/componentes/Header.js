import React from "react";
import { Navbar, Nav } from 'react-bootstrap';

function Header({ useNavigate }) {
  //FUNCTIONS
  const navigate = useNavigate();
  const onClickNavigateInicio = () => { navigate('/'); }
  const onClickNavigatePreenchimento = () => { navigate('/preenchimento'); }

  return (
    <>
      <header id="header">
        <Navbar bg="light" expand="lg">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-nav">
              <Nav.Link className="header-button1" onClick={onClickNavigateInicio}>INÍCIO</Nav.Link>
              <Nav.Link className="header-button1" onClick={onClickNavigatePreenchimento}>PREENCHIMENTO</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
