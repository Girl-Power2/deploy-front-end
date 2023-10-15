import React ,{useEffect, useState}from 'react'
import AdminNavBar from './AdminNavBar'
import { useSelector, useDispatch } from "react-redux";
import { NavLink,Outlet } from 'react-router-dom';

import {
 MDBCol,MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios';
import "./style.css"
const Admin = () => {
const [users ,setUsers]=useState(0)
const [provider ,setProvider]=useState(0)
const [category ,setCategory]=useState(0)
const { token } = useSelector((state) => {
  
  return {
    token: state.auth.token
  };
});
const getUsers=()=>{
  axios.get(`http://localhost:5000/users/conutOfUsers/`,{ headers: {
    Authorization: `Bearer ${token}`,
  }}).then((result)=>{

    setUsers(result.data.result[0].count)
  }).catch((err)=>{
    console.log(err);
  })
}

const getProvider=()=>{
  axios.get(`http://localhost:5000/providers/all/count/`).then((result)=>{
    setProvider(result.data.data[0].numberofproviders)
  }).catch((err)=>{
    console.log(err);
  })
}

const getCategory=()=>{
  axios.get(`http://localhost:5000/categories/countAllCategories`,{ headers: {
    Authorization: `Bearer ${token}`,
  }}).then((result)=>{
    setCategory(result.data.result[0].count)
  }).catch((err)=>{
    console.log(err);
  })
}
useEffect(()=>{
getUsers()
getProvider()
getCategory()
},[])

  return (
    <>
   <AdminNavBar/>
    <div className='Admincontainer' >
      <div className='aside' style={{height:'100%'}}>
      <aside >
        <h1></h1>
    <h1></h1>
    <NavLink to="addCategory" >Add category</NavLink>
    <hr/>
    <NavLink to="providerAndOrders">Providers Analytics</NavLink>
    <hr/>
    <NavLink to="">analytics</NavLink>
<hr/>


           
           
    </aside>
 <h6 className="text-uppercase fw-bold mb-4" style={{marginTop:'25rem'}}>
                <MDBIcon icon="gem" className="me-3" />
                Cure App
              </h6>
              <p>
              App of Health care  services  which are provided by providers of different specialities to  a wide range of care seekers at their homes ,which makes it easier  for the patients to get help.
              </p>  
    </div>
   <Outlet/>
    </div>
           
   </> 
  )
}

export default Admin