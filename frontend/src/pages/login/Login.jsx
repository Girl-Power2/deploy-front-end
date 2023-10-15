import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardImage
 
} from 'mdb-react-ui-kit';

import "./style.css"
const Login = () => {
  return (
    <div>
        <MDBRow>
      <MDBCol sm='6'>
        <MDBCard>
          <MDBCardBody style={{ backgroundColor: 'white' ,borderRadius:"0.5rem"}}>
          <MDBCardImage className='cardImg h-75 w-100'
      src='https://st2.depositphotos.com/30046358/48533/v/450/depositphotos_485337076-stock-illustration-planning-child-stay-hospital-vector.jpg'
   
    />
            <MDBCardTitle >SEEKING A SERVICE ? </MDBCardTitle>
            
            <MDBBtn href='/loginUser'>LOGIN </MDBBtn>

          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol sm='6'>
        <MDBCard>
          <MDBCardBody style={{ backgroundColor: 'white',borderRadius:"0.5rem" }}>
            
          <MDBCardImage className='cardImg'
      src='https://media.istockphoto.com/id/697882726/vector/avatars-characters-doctors-and-nurses-set-medical-people-icons-of-faces-on-a-blue-background.jpg?s=170667a&w=0&k=20&c=EeJl70YYHML6F91QnnmyvhHWJw2NJVmybzdCFLdae50='
     
    />
    
            <MDBCardTitle>ARE YOU A PROVIDER ?</MDBCardTitle>
            {/* <MDBCardText>
              With supporting text below as a natural lead-in to additional content.
            </MDBCardText> */}
            <MDBBtn href='/loginProvider'>LOGIN</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
        {/* <div>
        <NavLink to="/loginUser">Login user</NavLink>
</div>
<div>
        <NavLink to="/loginProvider">Login provider</NavLink>
</div> */}
    </div>
  )
}

export default Login