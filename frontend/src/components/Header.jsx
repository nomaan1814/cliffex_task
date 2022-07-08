import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const Header = () => {
  const [userexist, setUserExist] = useState(false);
  const [userdata, setsingUser] = useState({});
  const navigate = useNavigate();
  const authorized = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("userdetail"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user`, config);
      setUserExist(true);
      // console.log(data)
      setsingUser({data});
       navigate('/userlist')
    } catch (error) {
      setUserExist(false)
    }
  };
  useEffect(() => {
    authorized();
  }, [navigate]);
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">MERN TASK</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            {userexist && (
              <>
               <Navbar.Text>
                  Hello {userdata.data.name}
               </Navbar.Text>
                <Nav.Link
                  onClick={() => {
                    localStorage.removeItem("userdetail");
                    navigate("/");
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
