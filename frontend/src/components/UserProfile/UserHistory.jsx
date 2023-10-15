import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBInput,
 MDBCardText,
  MDBBtn,
 MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon
} from "mdb-react-ui-kit";

import {
    setHistory,
    updateHistory,
    deleteHistoryById,
  } from "../../service/redux/reducers/history";

 
  
  const UserHistory = () => {
    
    const [basicModal, setBasicModal] = useState(false);
  const [newHistories ,setNewHistories] = useState("")
  const[newChronic_diseases ,setNewChronic_diseases] =useState("")
  
  const [newMedications ,setNewMedications]=useState("")
    const toggleShow = () => setBasicModal(!basicModal);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => {
      return {
        token: state.auth.token,
      };
    });
    const { history } = useSelector((state) => {
      return {
        history: state.history.history,
      };
    });

    useEffect(()=>{
        axios.get(`http://localhost:5000/history/users/`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }).then((result)=>{
           
            dispatch(setHistory(result.data.result))
        }).catch((err)=>{
            console.log(err);
        })
    },[history.length])

    
  
    const notifyUpdat = () =>
    toast.success("Your History Updated Successfully", {
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
      'Your History Was Deleted ',
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
  
    return (
      <div>
          <div className="mb-5">
                        <p className="lead fw-normal mb-1">History</p>
                        {history.map((data ,i)=>{
                            return (<div>

                        <div
                          className="p-4 m-2"
                          style={{ backgroundColor: "#B2DFDB" }}
                        >
                          <MDBCardText className="font-italic mb-1">
                            History: {data.history}
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-1"></MDBCardText>
                          <hr />
                          <MDBCardText className="font-italic mb-1">
                            Chronic_Diseases : {data.chronic_diseases}
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-1"></MDBCardText>
                          <hr />
                          <MDBCardText className="font-italic mb-0">
                            Medications : {data.medications}
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-0"></MDBCardText>
                        </div>
                        <>
      <MDBBtn onClick={toggleShow}><MDBIcon fas icon="edit" /></MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody> <MDBInput
                                    id="form4Example1"
                                    wrapperClass="mb-4"
                                    valueDefault={data.history}
                                    label="history"
                                    onChange={(e)=>{
                                        setNewHistories(e.target.value)
                                    }}
                                  />
                                  <MDBInput
                                    type="text"
                                    valueDefault={data.chronic_diseases}
                                    wrapperClass="mb-4"
                                    label="chronic_diseases" 
                                    onChange={(e)=>{
                                        setNewChronic_diseases(e.target.value)
                                    }}
                                  />
                                  <MDBInput
                                    wrapperClass="mb-4"
                                    textarea
                                   rows={6}
                                   valueDefault={data.medications}
                                    label=" Medications"
                                    onChange={(e)=>{
                                        setNewMedications(e.target.value)
                                    }}
                                  /></MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
              <MDBIcon fas icon="times" size="lg"/> Close
              </MDBBtn>
              <MDBBtn onClick={()=>{
                axios.put(`http://localhost:5000/history/${data.medical_history_id}`,{history :newHistories,medications:newMedications,
                chronic_diseases:newChronic_diseases},{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                }).then((result)=>{
                    toggleShow()
                    notifyUpdat()
                    dispatch(updateHistory(result.data.result[0]))
                }).catch((err)=>{
                    console.log(err);
                })
              }}> <MDBIcon fas icon="plus" size="lg"/> Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
                        <MDBBtn
                         
                          color="danger"
                          className="ms-1"
                          style={{ height: "36px", overflow: "visible" }}
                          onClick={()=>{
                            axios.delete(`http://localhost:5000/history/${data.medical_history_id}`,{
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                            }).then((result)=>{
                              notifyErr()
                                dispatch(deleteHistoryById(data.medical_history_id))
                            }).catch((err)=>{
                                console.log(err);
                            })
                          }}
                        >
                         <MDBIcon fas icon="trash" />
                        </MDBBtn>
                        
                       </div>)
                        })}
                      </div>
                      <ToastContainer/>
      </div>
    )
  }
  
  export default UserHistory