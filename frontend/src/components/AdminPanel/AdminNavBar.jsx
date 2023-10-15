import React, { useState } from 'react';
import { NavLink,Outlet } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon
} from 'mdb-react-ui-kit';

const AdminNavBar=()=> {
  
  const [showNav, setShowNav] = useState(false);

  return (
    <MDBNavbar expand='lg' style={{backgroundColor:"white"}}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'><img
              src="https://res.cloudinary.com/drzcyo3sv/image/upload/v1696596722/3_plgdu0.png"
              height="75"
              width="90"
              alt=""
              loading="lazy"
            /></MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink href='/cureApp/admin' active aria-current='page' >
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
         
    

       
            <MDBNavbarItem>
                    <MDBNavbarLink
                      active
                      aria-current="page"
                      href="/cureApp/login"
                      onClick={() => {
                        setLogout();
                        // googleLogout();
                      }}
                    >
                      <NavLink
                        to="/cureApp/login"
                        onClick={() => {
                          dispatch(
                            setLogout({ isLoggedIn, userId,token })
                          );
                        }}
                      >
                        Logout
                      </NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
            
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    
  );
}
export default AdminNavBar