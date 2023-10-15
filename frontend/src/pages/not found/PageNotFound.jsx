import React from 'react'
import "./style.css"
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const PageNotFound = () => {
const navigate=useNavigate()
  return (
    <div className='containerOFNOTFOUND'>
   <div className='NotFound'>
    <div>
      
    <img className="Four04img"src="https://res.cloudinary.com/drzcyo3sv/image/upload/v1697208594/images_bb6g6a.jpg"/></div>
    <div className='fourOfour'>
      <h3>AWWWWW.... What we got here?!😲</h3>
      <h3>A LOST USER😆</h3>
      <h4 >You are in 404 dude!</h4>
      <h4>🔫Last Chance</h4>
    <button style={{color:"navy"}} onClick={()=>{
      navigate(-1)
    }}>GO BACK TO WHERE YOU CAME FROM</button>
    OR
    <button  style={{color:"navy"}} onClick={()=>{
      navigate("/")
    }}>GO BACK TO THE HOME PAGE</button>

   </div></div>
   <div className='us'>
<h3> You can see our other projects here😉👉</h3>
    <NavLink to="https://github.com/HalaAbuShalbak" className="usLink">😎Hala AbuShalbak </NavLink> <br/>
    <NavLink to= "https://github.com/DuhaDahamsheh" className="usLink">😎Duha Al-Dahamsheh </NavLink></div>
   
   </div>
  )
}

export default PageNotFound