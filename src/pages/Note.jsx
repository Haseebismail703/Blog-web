import React from 'react'
import {  Link } from "react-router-dom";
import {Button} from 'react-bootstrap'
import '../style/Home.css'
function Note() {
    return (
        <div className='page' >
        <center>
             <h1>Page Note Found</h1><br /> <br />
             <Button as={Link} to={'/'} >Back to Home </Button>
        </center>
        </div>
    )
}

export default Note