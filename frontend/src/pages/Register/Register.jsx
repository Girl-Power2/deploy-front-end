// import React from 'react'

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./style.css"

function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}

const bull = (

  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="registerCards">
      <Card
        sx={{
          width: 'auto',
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'left',
          ml: 5,
          mr:5,
          mt: "2rem",
          boxShadow: 10,
          borderRadius: 2,
          border: 1,
        }}
        
      >
      <CardContent>

          <CardMedia style={{marginBottom:"1rem" ,borderRadius:"0.5rem"}}
            component="img"
            height="300"
            image="https://jungleworks.com/wp-content/uploads/2021/10/shutterstock_1049387201.png"
            alt="Provider"
          />
          <Typography variant="h5" component="div" style={{fontFamily:"gorgea"}}>
            If you are willing to harness your powers to meet the need of care
            seekers,this is the right place to start from!
          </Typography>
        </CardContent>
        <CardActions>

          <NavLink to="/provider" style={{fontSize:"larger"}}>Join Us</NavLink>
         

        </CardActions>
        
      </Card>
      <Card
        sx={{
          width: 'auto',
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'left',
          ml: 5,
          mr:5,
          mt: "2rem",
          boxShadow: 10,
          borderRadius: 2,
          border: 1,
        }}
        
      >
      <CardContent>
          <CardMedia style={{marginBottom:"1rem" ,borderRadius:"0.5rem"}}
            component="img"
            height="300"
            image="https://www.scnsoft.com/healthcare/patient-apps/patient-apps-cover-picture.svg"
            alt="Provider"
          />
           <Typography variant="h5" component="div" style={{fontFamily:"gorgea"}}>
            If you are seeking for the best quality of care from experienced
            providers who will come to your house.Register now!
          </Typography>
        </CardContent>
        <CardActions>

          <NavLink to="/user" style={{fontSize:"larger"}}>Register Now</NavLink>
         

        </CardActions>
        
      </Card>
      

      
      
      
      
       </div>
    );
  }


    
 
