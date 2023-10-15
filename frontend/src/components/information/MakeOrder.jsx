import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { addOrder } from "../../service/redux/reducers/order";
import { setSchedule,updateSchedule } from "../../service/redux/reducers/schedule";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Map from "../Map/Map";
import Button from "react-bootstrap/Button";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const MakeOrder = () => {
  const navigate=useNavigate()
  const [serv, setServ] = useState();
  const [adress, setAdress] = useState("");
  const [sched, setSched] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [basicModal, setBasicModal] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const toggleShow = () => setBasicModal(!basicModal);
  const makeOrders =()=>{
    axios
    .post(
      `http://localhost:5000/orders/`,
      {
        service_id: serv,
        provider_id: id,
        schedule_id: sched,
        adress: adress,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((result) => {
      dispatch(addOrder(result.data.result));
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const { service } = useSelector((state) => {
    return {
      service: state.services.service,
    };
  });
  const { location } = useSelector((state) => {
    return {
      location: state.orders.location,
    };
  });
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const { schedule } = useSelector((state) => {
    return {
      schedule: state.schedule.schedule,
    };
  });
  const update =(id)=>{
    axios.put(`http://localhost:5000/schedules/updateBooked/`,{schedule_id:id},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result)=>{
dispatch(updateSchedule(id))
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(() => {
    axios
      .get(`http://localhost:5000/schedules/notchosen/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setSchedule(result.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const notifySucc = () =>
  toast.success("Order Created Successfully", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  return (
    <div>
      <p>Select A Service </p>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Services</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={serv}
            label="Services"
            name="Services"
            onChange={(e) => {
              setServ(parseInt(e.target.value));
            }}
          >
            {service &&
              service.map((categ, i) => {
                return (
                  <MenuItem key={i} value={categ.service_id}>
                    {categ.service}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Box>
      <hr />
      <p>Select A Time</p>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Time</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sched}
            label="Services"
            name="Services"
            onChange={(e) => {
              setSched(parseInt(e.target.value));
            }}
          >
            {schedule &&
              schedule.map((categ, i) => {
                return (
                  <MenuItem key={i} value={categ.schedule_id}>
                    {categ.time_from}-{categ.time_to}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Box>
      <hr />
      Insert Your Address
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => {
            setAdress(e.target.value);
          }}
        />

<Button  onClick={handleClickOpen}>
        Set Your Location On The Map
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Map
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent style={{width:"100vw"}}>
         <Map/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>

      </Box>
      <hr />
      
      <Button
       
        onClick={() => {
         makeOrders()
         notifySucc()
         update(sched)

        }}
      >
        Creat Order
      </Button>
    <ToastContainer/>
    </div>
    
  );
};

export default MakeOrder;
