import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import 'aos/dist/aos.css'
import Aos from 'aos';
import '../style/Home.css'
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
function Foter() {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  const date = new Date
  const year = date.getFullYear()

  return (

    <div
    >
      <footer className="flex-shrink-0 py-4 bg-dark text-white-50 ">
        <div className="container text-center  ">
          <small>Copyright © {year} Blog App
          </small>
          <center>
          <div className="col-md-6 text-center text-md-right">
      <Link className="text-light git fab fa-github fa-lg "  target='blank' as={Link} to="https://github.com/Haseebismail703"></Link>
    </div>
        </center>
        </div>
      </footer>
    </div>



  )
}

export default Foter