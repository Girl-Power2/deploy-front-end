import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MDBCard, MDBCardBody, MDBContainer } from "mdb-react-ui-kit";
import axios from "axios";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./style.css";
import { addService} from '../../service/redux/reducers/services';
import React from 'react'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Service = () => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch=useDispatch()
    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);
    const [service, setService] = useState("");
    const [price, setPrice] = useState("");
  const[click,setClick]=useState(true)

  const{providerId,token}=useSelector((state)=>{
    return{
        providerId:state.auth.providerId,
    token:state.auth.token, 
    }
   
  })


  const insert_service = () => {
    axios
      .post(
        `http://localhost:5000/services`,{
          service: service ,
          price_per_hour: price ,
          provider_id: providerId,
        },
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setMsg({ success: true, msg: result.data.message });
        dispatch(addService({
          service: service ,
          price_per_hour: price ,
          provider_id: providerId,
        }))
      })
      .catch((err) => {
        setMsg({ success: false, msg: err.result.data.message });
      });
  };
  const notifySucc = () =>
  toast.success("Service Add Successfully", {
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

 {/* ============================start of second modal==================================================} */}
<MDBContainer fluid className="py-5" style={{ backgroundColor: "#E0F2F1" }}>
<div className="main-timeline">
<div className="timeline right">
          <MDBCard style={click?{boxShadow:"2px 3px 3px 1px black",border:"4px groove #A9CBC8"}:{boxShadow:"none"}} onClick={()=>{
       setClick(false)
            }}>
            <MDBCardBody className="p-8">

<h4 style={{cursor:"pointer"}} onClick={handleShow} className="mb-0">Add a service</h4>
     

        <Modal show={show} onHide={handleClose}>
          
          <div className="inputs" >
            <p>You can add more from <Link to="/services">My services</Link></p>
            <Form.Control
              placeholder="Service"
              aria-label="Service"
              aria-describedby="basic-addon1"
              autoFocus
              onChange={(e) => {
               setService(e.target.value)
                
              }}
            />

            <InputGroup>
              <InputGroup.Text>Price-per-hour</InputGroup.Text>
              <Form.Control
                
                aria-label="price"
                autoFocus
                onChange={(e) => {
                setPrice(e.target.value)
                  
                }}
              />
              <InputGroup.Text>JOD</InputGroup.Text>
            </InputGroup>
            
            <Button
              as="input"
              type="submit"
              value="Submit"
              onClick={() => {
              
                  insert_service();
                  
                  notifySucc()
             setTimeout(() => {
             handleClose() 
             }, 2000);
                
              }}
            />
            <ToastContainer />
          </div>
        </Modal> 
        {/* ============================end of second modal==================================================*/}


   
    </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </MDBContainer>
    </div>
  )
}

export default Service