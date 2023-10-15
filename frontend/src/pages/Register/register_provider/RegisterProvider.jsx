import {useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../register_provider/app.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Cure App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function RegisterProvider() {
  const{schedule}=useSelector((state)=>{
    return{
       schedule:state.schedule.schedule
    }
   
  })

  const [data, setData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    fName: "",
    lName: "",
    birthDate: "",
    city: "",
    role_id: 3,
    category_id: 7,
    gender: "female",
  });
  const [msg, setMsg] = useState("");
  const [category, setCategory] = useState([]);
  const handleChange = (e) => {
    setData({ ...data, category_id: e.target.value });
  };
  // const result = useLoaderData;
 

  const getCategory = () => {
    axios
      .get("http://localhost:5000/categories/")
      .then((result) => {
        setCategory(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCategory();
  }, []);

  const successNotify = () => toast.success('Your Account Created successfully', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

    const notifyErr = () =>
    toast.error(
      'You Have An Error',
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );

 const history=useNavigate()
  return (

    <ThemeProvider theme={defaultTheme}>
      <div style={{maxHeight:'50vh'}}  xs={12}
  sm={4}
  md={7}> 
      <Grid container component="main" sx={{ maxHeight: "50vh"  }}>
        <CssBaseline />
        
       <Grid
  item
  xs={12}
  sm={4}
  md={7}
 
  sx={{
    backgroundImage: 'url(https://www.pixelcrayons.com/blog/wp-content/uploads/2021/04/Healthcare-App-Development.jpg)',     backgroundRepeat: 'no-repeat',
    backgroundColor: (t) =>
      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    maxHeight: "90vh" 
  }}
/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxHeight:"70vh"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 1 ,maxHeight:"90vh"}}
            >
              <TextField
                margin="normal"
                required
                id="First Name"
                label="First Name"
                name="First Name"
                style={{marginRight:'0.5rem'}}
                autoFocus
                onChange={(e) => {
                  setData({ ...data, fName: e.target.value });
                }}
              />
              <TextField
               
                required
                margin="normal"
                id="Last Name"
                label="Last Name"
                name="Last Name"
                style={{marginLeft:'0.5rem'}}
                autoFocus
                onChange={(e) => {
                  setData({ ...data, lName: e.target.value });
                }}
              />
              <TextField
                margin="normal"
                required
                id="City"
                label="City"
                name="City"
                autoFocus
                style={{marginRight:'0.5rem'}}
                onChange={(e) => {
                  setData({ ...data, city: e.target.value });
                }}
              />
              <TextField
                margin="normal"
                required
                id="Birth Date"
                label="Birth Date 1995-5-25 "
                name="Birth Date"
                style={{marginLeft:'0.5rem'}}
                autoFocus
                onChange={(e) => {
                  setData({ ...data, birthDate: e.target.value });
                }}
              />

<TextField
                margin="normal"
                required
              
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                style={{marginRight:'0.5rem'}}
                autoFocus
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
              <TextField
                margin="normal"
                required
               
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{marginLeft:'0.5rem'}}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
              <TextField
                margin="normal"
                required
               style={{width:'83%'}}
                id="Phone Number"
                label="Phone Number"
                name="Phone Number"
                autoFocus
                onChange={(e) => {
                  setData({ ...data, phoneNumber: e.target.value });
                }}
              />
<div className="select_container">
              <Box sx={{ minWidth: 120 }}>
                <FormControl  style={{marginRight:'0.5rem' ,width:'100%'}} >
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.gender}
                    label="Gender"
                    name="Gender"
                    onChange={(e) => {
                      setData({ ...data, gender: e.target.value });
                    }}
                  >
                    <MenuItem value="male">Female</MenuItem>
                    <MenuItem value="female">Male</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl  fullWidth  style={{marginLeft:'0.5rem'}}>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.category_id}
                    label="Category"
                    name="Category"
                    onChange={(e) => {
                      setData((prev)=>
                      {return { ...prev, category_id:parseInt( e.target.value) }
                    })}}
                  >
                    {category &&
                      category.map((categ, i) => {
                        return (
                          
                            
                            <MenuItem key={i} value={categ.category_id}>
                              {categ.category}
                            </MenuItem>
                         
                        );
                      })}

                   
                  </Select>
                </FormControl>
              </Box>
</div>
              
              <Button
                // type="submit"
             
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  axios
                    .post("http://localhost:5000/providers/", {
                      fName: data.fName,
                      lName: data.lName,
                      birthDate: data.birthDate,
                      gender: data.gender,
                      email: data.email,
                      password: data.password,
                      city: data.city,
                      phoneNumber: data.phoneNumber,
                      role_id: data.role_id,
                      category_id: data.category_id,
                     
                    })
                    .then((result) => {
                      setMsg({
                        success: true,
                        msg: result.data?.message,
                      });
                      successNotify()
                     setTimeout(()=>{
                      history('/loginProvider')
                     },2000)
                     
                    })
                    .catch((error) => {
                      console.log(error);
                      notifyErr()
                      setMsg({
                        success: false,
                        msg: error?.response?.data.message,
                      });
                    });
                }}
              >
                Register
              </Button>
              <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable
pauseOnHover
theme="colored"/>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
      </div>
    </ThemeProvider>
  );
}

// export default RegisterProvider
