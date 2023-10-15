import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBSpinner } from "mdb-react-ui-kit";
import { setOrder } from "../../service/redux/reducers/order";
import { NavLink } from "react-router-dom";
import "./style.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBTypography,
  MDBTableHead,
  MDBTable,
} from "mdb-react-ui-kit";

const NewOrders = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [today, setToday] = useState("");
  const [value, setValue] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const { orders } = useSelector((state) => {
    return {
      orders: state.orders.orders,
    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setOrder(result.data.result));
        setToday(result.data.result[0].date.toString().split("T")[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const notifySucc = () =>
  toast.success("Your Order Was Completed", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  if (orders.length === 0) {
    return (
      <MDBSpinner color="danger">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
  return (
    <div>
      <section className="vh-75" >
        <MDBRow className="justify-content-center align-items-center h-75 w-100">
          <MDBCol>
           
            <MDBTable>
              <MDBTableHead>
                <tr className="heders">
                  <th scope="col">
                    <NavLink to="/previousOrder">previous order</NavLink>
                  </th>
                  <th scope="col">
                   
                    <NavLink to="/orders">current order</NavLink>
                  </th>
                </tr>
              </MDBTableHead>
            </MDBTable>
            {orders &&
              orders.map((item, i) => {
                return (
                  <div key={i + 1} >
                    <MDBCard className="mb-4">
                      <MDBCardBody className="p-4">
                        <MDBRow className="align-items-center">
                          <MDBCol
                            md="2"
                            className="d-flex justify-content-center"
                          >
                            <div>
                              <p className="small text-muted mb-4 pb-2">Name of provider</p>
                              <p className="lead fw-normal mb-0">
                                {item.fname} {item.lname}
                              </p>
                            </div>
                          </MDBCol>
                          <MDBCol
                            md="1"
                            className="d-flex justify-content-center"
                          >
                            <div>
                              <p className="small text-muted mb-4 pb-2">
                                Service
                              </p>
                              <p className="lead fw-normal mb-0">
                                <MDBIcon
                                  fas
                                  icon="circle me-2"
                                  style={{ color: "#eee" }}
                                />
                                {item.service}
                              </p>
                            </div>
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="d-flex justify-content-center"
                          >
                            <div>
                              <p className="small text-muted mb-4 pb-2">Time</p>
                              <p className="lead fw-normal mb-0">
                                {item.time_from}-{item.time_to}
                              </p>
                            </div>
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="d-flex justify-content-center"
                          >
                            <div>
                              <p className="small text-muted mb-4 pb-2">Date</p>
                              <p className="lead fw-normal mb-0">{today}</p>
                            </div>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="d-flex justify-content-center"
                          >
                            <div>
                              <p className="small text-muted mb-4 pb-2">
                                Phone Number
                              </p>
                              <p className="lead fw-normal mb-0">
                                {item.phonenumber}
                              </p>
                            </div>
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="d-flex justify-content-center"
                          >
                            <div>
                              <p className="small text-muted mb-4 pb-2">
                                price_per_hour
                              </p>
                              <p className="lead fw-normal mb-0">
                                {item.price_per_hour}JD
                              </p>
                            </div>
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="d-flex justify-content-center"
                          >
                            <div>
                              <MDBBtn
                                onClick={() => {
                                  toggleShow();

                                  axios
                                    .get(
                                      `http://localhost:5000/orders/byId/${item.order_id}`,
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    )
                                    .then((result) => {
                                      console.log(result.data);
                                      setValue(result.data.result);
                                    
                                    
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                              >
                                Checkout ?
                              </MDBBtn>
                              <MDBModal
                                show={basicModal}
                                setShow={setBasicModal}
                                tabIndex="-1"
                              >
                                <MDBModalDialog>
                                  <MDBModalContent>
                                    <MDBModalHeader>
                                      <MDBBtn
                                        className="btn-close"
                                        color="none"
                                        onClick={toggleShow}
                                      ></MDBBtn>
                                    </MDBModalHeader>
                                    {value &&
                                      value.map((ord, i) => {
                                        return (
                                          <div>
                                            <MDBModalBody className="text-start text-black p-4">
                                              <MDBTypography
                                                tag="h5"
                                                className="modal-title text-uppercase mb-5"
                                                id="exampleModalLabel"
                                              >
                                                {ord.firstname} {ord.lastname}
                                              </MDBTypography>
                                              <MDBTypography
                                                tag="h4"
                                                className="mb-5"
                                                style={{ color: "#35558a" }}
                                              >
                                                Thanks for your order
                                              </MDBTypography>
                                              <p
                                                className="mb-0"
                                                style={{ color: "#35558a" }}
                                              >
                                                Payment summary
                                              </p>
                                              <hr
                                                className="mt-2 mb-4"
                                                style={{
                                                  height: "0",
                                                  backgroundColor:
                                                    "transparent",
                                                  opacity: ".75",
                                                  borderTop:
                                                    "2px dashed #9e9e9e",
                                                }}
                                              />
                                              <div className="d-flex justify-content-between">
                                                <p className="small mb-0">
                                                  Your Address:
                                                </p>
                                                <p className="small mb-0">
                                                  {ord.adress}
                                                </p>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <p className="small mb-0">
                                                  Your Phone Number :
                                                </p>
                                                <p className="small mb-0">
                                                  {ord.phonenumber}
                                                </p>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <p className="small mb-0">
                                                  Your Email:
                                                </p>
                                                <p className="small mb-0">
                                                  {ord.email}
                                                </p>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <p className="small mb-0">
                                                  Your Country:
                                                </p>
                                                <p className="small mb-0">
                                                  {ord.city}
                                                </p>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <p className="fw-bold mb-0">
                                                  price_per_hour
                                                </p>
                                                <p className="text-muted mb-0">
                                                  {ord.price_per_hour}JD
                                                </p>
                                              </div>

                                              <div className="d-flex justify-content-between">
                                                <p className="small mb-0">
                                                  Transportaion Allowance
                                                </p>
                                                <p className="small mb-0">
                                                  5.00 JD
                                                </p>
                                              </div>

                                              <div className="d-flex justify-content-between pb-1">
                                                <p className="small">Tax</p>
                                                <p className="small">5.00 JD</p>
                                              </div>

                                              <div className="d-flex justify-content-between">
                                                <p className="fw-bold">Total</p>
                                                <p
                                                  className="fw-bold"
                                                  style={{ color: "#35558a" }}
                                                >
                                                  {5 + 5 + ord.price_per_hour}{" "}
                                                  JD
                                                </p>
                                              </div>
                                            </MDBModalBody>
                                            <MDBBtn onClick={()=>{
                                              console.log(token);
                                              axios.put(`http://localhost:5000/orders/ByOrder/${ord.order_id}`,{},{ headers: {
                                                Authorization: `Bearer ${token}`,
                                              },
                                            }).then((result)=>{
                                              console.log(result.data);
                                              notifySucc()
                                              setTimeout(()=>{
                                             history("/previousOrder")
                                              },2000)
                                              
                                            }).catch((err)=>{
                                              console.log(err);
                                            })
                                            }}>checkout ?</MDBBtn>
  
                                          </div>
                                        );
                                      })}

                                    <MDBModalFooter>
                                      <MDBBtn
                                        color="secondary"
                                        onClick={toggleShow}
                                      >
                                        Close
                                      </MDBBtn>
                                    </MDBModalFooter>
                                  </MDBModalContent>
                                </MDBModalDialog>
                              </MDBModal>
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                );
              })}
          </MDBCol>
        </MDBRow>
        <ToastContainer/>
      </section>
    </div>
  );
};

export default NewOrders;
