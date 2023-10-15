import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBCol,
  MDBInput,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner, 
  MDBIcon
} from "mdb-react-ui-kit";

import "./style.css";
import {
  setHistory,
  addHistory,
  updateHistory,
  deleteHistoryById,
} from "../../service/redux/reducers/history";
import UserHistory from "./UserHistory";
import Weather from "./Weather";

const UserProfile = () => {
  const [profile, setProfile] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [today ,setToday]=useState()
  const [basicModal, setBasicModal] = useState(false);
const [histories ,setHistories] = useState("")
const[chronic_diseases ,setChronic_diseases] =useState("")
const [medications ,setMedications]=useState("")
  const toggleShow = () => setBasicModal(!basicModal);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  

  const notifySucc = () =>
  toast.success("Your History Add Successfully", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setToday(result.data.data[0].birthdate.toString().split('T')[0])
        setProfile(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (profile.length == 0) {
    return (
      <MDBSpinner color="danger">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
  return (
    <div>
      <div className="gradient-custom-2">
        
        <div>
        
          <MDBRow>
          <MDBCol md="8">
            <MDBCard>
              {profile.map((data, i) => {
               
                return (
                  <div key={i}>
                    <div
                      className="rounded-top text-white d-flex flex-row"
                      style={{ backgroundColor: "#262626", height: "200px" }}
                    >
                      <div
                        className="ms-4 mt-5 d-flex flex-column"
                        style={{ width: "150px" }}
                      >
                        <MDBCardImage
                          src="https://cdn.vectorstock.com/i/1000x1000/35/72/young-woman-sick-with-fever-avatar-character-vector-31733572.webp"
                          alt="Generic placeholder image"
                          className="mt-4 mb-2 img-thumbnail"
                          fluid
                          style={{ width: "150px", zIndex: "1" }}
                        />
                      </div>

                      <div className="ms-3" style={{ marginTop: "130px" }}>
                        <MDBTypography tag="h5">
                          {data.firstname} {data.lastname}
                        </MDBTypography>
                        <MDBCardText>{data.city}</MDBCardText>
                      </div>
                    </div>

                    <MDBCardBody className="text-black p-4 ">
                      <div className="mb-5 text-left">
                        <p className="lead fw-normal mb-1">About</p>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#B2DFDB" }}
                        >
                          <MDBCardText className="font-italic mb-1">
                            Age :{data.age.years}
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-1">
                            Birthdate :{today}
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-1">
                            Lives in {data.city}
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-0">
                            Gender :{data.gender}
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-0">
                            Phone Number :{data.phonenumber}
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-0">
                            Email :{data.email}
                          </MDBCardText>
                        </div>
                      </div>
                      <UserHistory/>
                      <>
                          <MDBBtn onClick={toggleShow} ><MDBIcon far icon="address-book"  size="lg"/>  Add History</MDBBtn>
                          <MDBModal
                            show={basicModal}
                            setShow={setBasicModal}
                            tabIndex="-1"
                          >
                            <MDBModalDialog>
                              <MDBModalContent>
                                <MDBModalHeader>
                                  <MDBModalTitle>Add History</MDBModalTitle>
                                  <MDBBtn
                                    className="btn-close"
                                    color="none"
                                    onClick={toggleShow}
                                  ></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                  <MDBInput
                                    id="form4Example1"
                                    wrapperClass="mb-4"
                                    label="history"
                                    onChange={(e)=>{
                                        setHistories(e.target.value)
                                    }}
                                  />
                                  <MDBInput
                                    type="text"
                                
                                    wrapperClass="mb-4"
                                    label="chronic_diseases" 
                                    onChange={(e)=>{
                                        setChronic_diseases(e.target.value)
                                    }}
                                  />
                                  <MDBInput
                                    wrapperClass="mb-4"
                                    textarea
                                   rows={6}
                                    label=" Medications"
                                    onChange={(e)=>{
                                        setMedications(e.target.value)
                                    }}
                                  />

                                  
                                </MDBModalBody>

                                <MDBModalFooter>
                                  <MDBBtn
                                    color="secondary"
                                    onClick={toggleShow}
                                  >
                                  <MDBIcon fas icon="times" size="lg"/>  Close
                                  </MDBBtn>
                                  <MDBBtn onClick={()=>{
                                    
                                    axios.post(`http://localhost:5000/history/`,{history:histories ,medications,chronic_diseases},{
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }).then((result)=>{
                                        toggleShow()
                                        dispatch(addHistory({history:histories ,medications,chronic_diseases}))
                                        notifySucc()
                                       
                                      }).catch((err)=>{
                                        console.log(err);
                                      })
                                  }}> <MDBIcon fas icon="plus" size="lg"/> ADD</MDBBtn>
                                </MDBModalFooter>
                              </MDBModalContent>
                            </MDBModalDialog>
                          </MDBModal>
                        </>
                        
                    
                    </MDBCardBody>
                  </div>
                );
              })}
            </MDBCard>
          </MDBCol>
          <MDBCol  md="4"><Weather/></MDBCol>
        </MDBRow>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default UserProfile;
