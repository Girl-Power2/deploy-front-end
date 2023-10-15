import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBSpinner } from "mdb-react-ui-kit";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setService,
  updateService,
  addService,
  deleteService
} from "../../../service/redux/reducers/services";
const MyServices = () => {
  // ====================states==============================
  const [newService, setNewService] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [show, setShow] = useState(false);
 const [serviceNew, setServiceNew] = useState("");
  const [price, setPrice] = useState("");
  const[open,setOpen]=useState(false)

  const { providerId, token } = useSelector((state) => {
    return {
      providerId: state.auth.providerId,
      token: state.auth.token,
    };
  });
  const { service } = useSelector((state) => {
    return {
      service: state.services.service,
    };
  });
  // ====================states==============================
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

  const notifyUpdat = () =>
  toast.success("Service Updated Successfully", {
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
    'Service Deleted Successfully',
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

  // ====================functions==============================
  const dispatch = useDispatch();
  const handleClose = () => {setShow(false),setOpen(false)}
  const handleShow = (id) => setShow(id);
  const handleOpen=()=>setOpen(true)

  const getservices = () => {
    axios
      .get(`http://localhost:5000/services/byId/${providerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setService(result.data.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getservices();
  }, []);
  const update_service = (id) => {
    axios
      .put(
        `http://localhost:5000/services/byId/${id}`,
        { service:serviceNew, price_per_hour:price},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(
          updateService({ service: result.data.data[0].service, price_per_hour: result.data.data[0].price_per_hour, id })
        );
        setServiceNew("")
        setPrice("")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const add_service = () => {
    axios
      .post(
        `http://localhost:5000/services`,{
          service: newService ||null,
          price_per_hour: newPrice ||null,
          provider_id: providerId,
        },
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(addService({
          service: result.data.data[0].service ,
          price_per_hour: result.data.data[0].price_per_hour ,
          provider_id: providerId,
        }))
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ====================functions==============================

  return (
    <div className="myServicesContainer">
            <Button style={{width:"30vw",marginTop:"1rem"}}
            onClick={()=>{
              handleOpen()
         
            }}
            >add service</Button>
            <Modal show={open} onHide={handleClose}>
                  <div className="inputs">
                    <Modal.Body>
                      <InputGroup>
                        <InputGroup.Text>Service</InputGroup.Text>
                        <Form.Control
                          as="textarea"
                          aria-label="Service update"
                          autoFocus
                          onChange={(e) => {
                            setNewService(e.target.value);
                          }}
                        />
                      </InputGroup>

                      <InputGroup>
                        <InputGroup.Text>Price_per_hour</InputGroup.Text>
                        <Form.Control
                          aria-label="Price_per_hour"
                          autoFocus
                          onChange={(e) => {
                            setNewPrice(e.target.value);
                          }}
                        />
                      </InputGroup>
                    </Modal.Body>
                    <Button
                        as="input"
                        type="submit"
                        value="Submit"
                        onClick={() => {
                          add_service();
                          notifySucc()
                              setTimeout(() => {
                               handleClose() 
                              }, 2000);
                          getservices()
                         
                        }}
                      />
                    </div>
                    
                    </Modal>
                 
<div className="servicesontainer" > 
      {service ? (
        
        service.map((ser, i) => {
          return (
           
              <div key={i} className="service">
                
                <p><span>Service name:</span>{ser.service}</p>
                <p><span>Price-per-hour:</span>{ser.price_per_hour} JD</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleShow(ser.service_id);
                  }}
                >
                  Edit Service
                </Button>
                <Button variant="primary" onClick={()=>{
                      axios.delete(`http://localhost:5000/services/${ser.service_id}`,{
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }).then((result)=>{
dispatch(deleteService(ser.service_id))
                      }).catch((err)=>{
                        console.log(err);
                      })
                      notifyErr()
                      setTimeout(() => {
                       handleClose() 
                      }, 2000);
                    }}>
                        Delete
                      </Button>

                <Modal show={show} onHide={handleClose}>
                  <div className="inputs">
                    <Modal.Body>
                      <InputGroup>
                        <InputGroup.Text>Service</InputGroup.Text>
                        <Form.Control
                          as="textarea"
                          aria-label="Service update"
                          autoFocus
                          onChange={(e) => {
                            setServiceNew(e.target.value);
                          }}
                        />
                      </InputGroup>

                      <InputGroup>
                        <InputGroup.Text>Price_per_hour</InputGroup.Text>
                        <Form.Control
                          aria-label="Price_per_hour"
                          autoFocus
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                        />
                      </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                 
                      <Button
                        as="input"
                        type="submit"
                        value="Submit"
                        onClick={(e) => {
                          update_service(show);
                          notifyUpdat()
                              setTimeout(() => {
                               handleClose() 
                              }, 2000);
                        }}
                      />
                    
                      <Button variant="primary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </div>
                </Modal>
              </div>
            
          );
        })
) : (
        <MDBSpinner color="success">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      )}
    </div>
    <ToastContainer/>
    </div>
  );
};

export default MyServices;
