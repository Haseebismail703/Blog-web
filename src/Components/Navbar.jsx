import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, auth, onAuthStateChanged } from '../Config/C'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import swal from 'sweetalert';
import '../style/Home.css'
import Aos from 'aos';
import 'aos/dist/aos.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from "react";
function ColorSchemesExample() {
  const [user, setuser] = useState('')
  const navigate = useNavigate()
  let get = () => onAuthStateChanged(auth, (user) => {
    if (user) {
      setuser(user)
    } else {
    }
  });
  useEffect(() => {
    get()
    Aos.init({duration : 800})
  }, [])

  // console.log(user);
  let logout = () => {
    const auth = getAuth();
      signOut(auth).then(() => {
      swal("Good job!", "Log out Successfully ", "success")
      navigate('/')
    }).catch((error) => {
      swal('Error', `${error}`, "error")
    });
  }
  return (

    
      <Navbar data-aos="flip-up" fixed="top" collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to={'/'} ><img data-aos="fade-right" className="logo" src="https://149611589.v2.pressablecdn.com/wp-content/uploads/2017/07/blog.png" alt="" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav  data-aos="fade-left" className="me-auto">
              <Nav.Link className="link" as={Link} to="/">Home</Nav.Link>
              <Nav.Link className="link"  as={Link} to="/All">All Blog's</Nav.Link>
              <Nav.Link className="link"   as={Link} to='/Contact'>Contact</Nav.Link>
            </Nav>
            { user &&  <Nav data-aos="zoom-in">
              <NavDropdown title={user.displayName ? user.displayName : 'Save your Name'} id="collapsible-nav-dropdown">
                <NavDropdown.Item   as={Link} to='/userdas' >
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item   as={Link} to={'/Profile'}>Profile</NavDropdown.Item>
                <NavDropdown.Item   onClick={logout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>}
          </Navbar.Collapse>
        </Container>
      </Navbar> 





  );
}

export default ColorSchemesExample;
