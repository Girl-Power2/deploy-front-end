import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css"
import axios from "axios";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse
} from "mdb-react-ui-kit";

import { setLogout } from "../../service/redux/reducers/auth";

const Navbar = () => {
  const dispatch = useDispatch();
const history = useNavigate()
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
const [show ,setShow]=useState(false)
  const { isLoggedIn, role, token, userId, providerId } = useSelector(
    (state) => {
      return {
        isLoggedIn: state.auth.isLoggedIn,
        role: state.auth.role,
        token: state.auth.token,
        userId: state.auth.userId,
        providerId: state.auth.providerId,
      };
    }
  );
  const [showBasic, setShowBasic] = useState(false);
  return (
    <div>
      {/* ====================IF NOT LOGGED IN======================  */}
      <MDBNavbar expand="md"  style={{backgroundColor:"white"}} aria-current="true">
        <MDBContainer fluid>
          <NavLink to="/">
            {" "}
            <img
              src="https://res.cloudinary.com/drzcyo3sv/image/upload/v1697135018/Provider_2_iaqlbc.jpg"
              height="90"
              width="100"
              alt=""
              loading="lazy"
            />
          </NavLink>
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              {!isLoggedIn && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/">
                      <NavLink to=""> Home</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/aboutUs">
                      <NavLink to="/aboutUs">About Us</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBDropdown>
                      <MDBDropdownToggle
                        tag="a"
                        className="nav-link"
                        role="button"
                        style={{fontWeight:"bolder"}}
                      >
                        Join Us
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem>
                          <NavLink to="/register">Register</NavLink>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <NavLink to="/login">Login</NavLink>
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                </>
              )}
              {/* ====================IF NOT LOGGED IN======================  */}

              {/* ====================IF LOGGED IN======================  */}

              {isLoggedIn && providerId && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink
                      active
                      aria-current="page"
                      href="/My_profile"
                    >
                      <NavLink to="/My_profile">My Profile</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/services">
                      <NavLink to="/services">My services</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink
                      active
                      aria-current="page"
                      href="/mySchedule"
                    >
                      <NavLink to="/mySchedule">My Schedule</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/myOrders">
                      <NavLink to="/myOrders">My Orders</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/notes">
                      <NavLink to="/notes">My Notes</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink
                      active
                      aria-current="page"
                      href="/"
                      onClick={() => {
                        setLogout();
                    
                      }}
                    >
                      
                      <NavLink
                        to="/"
                        onClick={() => {
                          dispatch(
                            setLogout({ isLoggedIn, providerId, userId, token })
                          );
                        }}
                      >
                        Logout
                      </NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}

              {token && userId && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/">
                      <NavLink to=""> Home</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/aboutUs">
                      <NavLink to="/aboutUs">About Us</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/category">
                      <NavLink to="category">Categoreis</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/myProfile">
                      <NavLink to="/myProfile">My Profile</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/orders">
                      <NavLink to="/orders">My Orders</NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink
                      active
                      aria-current="page"
                      href="/"
                      onClick={() => {
                        setLogout();
                      }}
                    >
                      <NavLink
                        to="/"
                        onClick={() => {
                          dispatch(
                            setLogout({ isLoggedIn, providerId, userId, token })
                          );
                        }}
                      >
                        Logout
                      </NavLink>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                
              </>
              )}
            </MDBNavbarNav>
            <input
              type="search"
              className="form-control w-25"
              placeholder="Type query"
              aria-label="Search"
              onChange={(e) => {
                setSearch(e.target.value);
                
              }}
              onClick={()=>{
                setShow(false)
              }}
            />
            
            <MDBBtn
              color="primary"
              onClick={() => {
                console.log(search);
                axios
                  .get(
                    `http://localhost:5000/providers/byName/?fname=${search}`
                  )
                  .then((result) => {
                    console.log(result.data);
                    setResult(result.data.data);
                    setShow(true)
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Search
            </MDBBtn>
            
         
         
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <div >
            {result && show
        ?(<div className="input">
        
         
          { result.map((name, i) => {
            return (
              <div key={i}  >
              <hr/>
                <h6 onClick={()=>{
                  history(`/provider_Information/${name.provider_id}`)
                  setShow(false)
                }}>
                  {name.fname} {name.lname}
                </h6>
              
              </div>
            );
          })}</div>)
        : null} 
        </div>
    </div>
  );
};

export default Navbar;
