import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { setLogin, setUserId } from "../../service/redux/reducers/auth";

import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function LoginAdmin() {
  const history =useNavigate()
const dispatch=useDispatch()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
  return (
    <div style={{backgroundColor:"#C5CAE9" ,height:'100vh'}}>
    <MDBContainer fluid style={{backgroundColor:"#C5CAE9"}} className='h-100 w-100'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '70vw' ,maxHeight:'70vh'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your email and password!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' style={{color:"white"}} size="lg" onChange={(e)=>{
                setEmail(e.target.value)
              }}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' style={{color:"white"}} size="lg" onChange={(e)=>{
                setPassword(e.target.value)
              }}/>

              <MDBBtn outline className='mx-2 px-5' color='white' size='lg'
              onClick={() => {
                axios
                  .post(`http://localhost:5000/users/login`, {
                    email,
                    password,
                  })
                  .then((result) => {
                   
                    dispatch(setLogin(result.data.token));
                    dispatch(setUserId(result.data.userId));
                    localStorage.setItem("token", result.data.token);
                    localStorage.setItem("userId", result.data.userId);
                    localStorage.setItem("roleId", 1);


                  
                     history("/cureApp/admin");
                  })
                  .catch((err) => {
                    console.log(err);
                    
                  });
              }}>
                Login
              </MDBBtn>

             

              

               
             

             
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

   </MDBContainer>
   </div>
  );
}

export default LoginAdmin;