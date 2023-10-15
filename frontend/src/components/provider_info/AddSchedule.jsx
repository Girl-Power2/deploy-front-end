import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { setSchedule } from "../../service/redux/reducers/schedule";
import { MDBCard, MDBCardBody, MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const AddSchedule = () => {
  const [timeFrom, setTimeFrom] = useState("24:00");
  const [timeTo, setTimeTo] = useState("24:00");
  const[msg,setMsg]=useState("")
  const [date, setDate] = useState('');
  const [today, setToday] = useState("")
  const[click,setClick]=useState(true)

  const [show, setShow] = useState(false);

  const { schedule } = useSelector((state) => {
    return { schedule: state.schedule.schedule };
  });
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  
  const notifySucc = () =>
  toast.success("Schedule Add Successfully", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });




  const handleClose = () => setShow(false);
  const handleShow = () => {
    setToday(new Date().toISOString().split('T')[0])
    setShow(true)};
  const dispatch = useDispatch();

  const setSchedules = () => {
    axios
      .post(
        `http://localhost:5000/schedules/`,
        { time_from: timeFrom, time_to: timeTo,DATE:date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(setSchedule(result.data.data));
        setMsg(result.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
       <MDBContainer fluid className="py-5" style={{ backgroundColor: "#E0F2F1" }}>
      <div className="main-timeline">
        <div className="timeline left">
          <MDBCard  style={click?{boxShadow:"2px 3px 3px 1px black",border:"4px groove #A9CBC8"}:{boxShadow:"none"}} onClick={()=>{
       setClick(false)
            }}>
            <MDBCardBody className="p-8">
        <h4 style={{cursor:"pointer"}} onClick={handleShow} className="mb-0">Add a schedule</h4>
      <Modal show={show} onHide={handleClose}>
        <div className="inputs">
          <p>
            Please enter your available hours to work you can add more from{" "}
            <Link to="/myschedule">My schedule</Link>
          </p>
          <label>
            Date:
            <input type="date" style={{width:"70%", textAlign:"center"}}
            min={today}
            onChange={(e)=>{
                console.log(e.target.value);
                setDate(e.target.value)

            }}
            ></input>
          </label>
          <label>
            From:
            <input
              type="time"
              min="08:00"
              max="23:00"
              step="3600"
              placeholder="08:00"
              name="time_from"
              required
              pattern="[0-9]{2}:[0-9]{2}"
              style={{width:"70%", textAlign:"center"}}

              onChange={(e) => {
                setTimeFrom(e.target.value);
              }}
            />
          </label>
          <label>
            To:
            <input
              type="time"
              min="09:00"
              max="00"
              step="3600"
              name="time_to"
              placeholder="09:00"
              pattern="[0-9]{2}:[0-9]{2}"
              style={{width:"70%", textAlign:"center"}}
              required
              onChange={(e) => {
                setTimeTo(e.target.value);
              }}
            />
          </label>
{msg&&<p>{msg.msg}</p>}
          <Button
            as="input"
            type="submit"
            value="Submit"
            onClick={() => {
              setSchedules();
             notifySucc()
             setTimeout(() => {
             handleClose() 
             }, 2000);
              ;
              window.location.reload(false)
            }}
          />
            <ToastContainer />
        </div>
      </Modal>
      </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </MDBContainer>
    </>
  );
};

export default AddSchedule;
