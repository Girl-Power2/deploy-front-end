import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./style.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { MDBSpinner } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setNotes,
  addNotes,
  updateNotes,
  deleteNotesById,
  notes,
} from "../../../service/redux/reducers/notes";
const Note = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const [ptId, setPtId] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { providerId } = useSelector((state) => state.auth);
  const [today, setToday] = useState("");
  const [query, setQuery] = useState("");
  const [edit, setEdit] = useState("");
  const [Input, setInput] = useState(false);

  const [updatedNote, setUpdatedNote] = useState("");



  const { notes } = useSelector((state) => state.notes);
  const handleClose = () => setShow(false);

  function handleShow() {
    setShow(true);
  }

const notifySucc=()=>{
  toast.success("Note Add Successfully", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  })}

  const notifyUpdat = () =>
  toast.success("Note Updated Successfully", {
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
    'Note Deleted Successfully',
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
  // ==========get all notes===================
  const getNotes = () => {
    axios
      .get(`http://localhost:5000/notes/byProvider/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setNotes(result.data.data));
        setToday(result.data.data[0].visitied_on.toString().split("T")[0]);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  // ==========get all notes===================

  useEffect(() => {
    getNotes();
  }, []);
  // ==========get user notes===================

  const getUserNotes = () => {
    axios
      .get(
        `http://localhost:5000/notes/byUser/usernotes/?id=${parseInt(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(setNotes(result.data.data));
        setToday(result.data.data.visitied_on.toString().split("T")[0]);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // ==========get user notes===================

  return (
    <>
      <div className="pageContainer">
        <div className="headerOfPNotes">
          <Button onClick={() => handleShow()}>add note</Button>
          <div
            className="searchNotes"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <input
              type="text"
              className="form-control w-75"
              placeholder="Search for note by client Id"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                getUserNotes();
              }}
            >
              Search
            </Button>
            ,
          </div>
        </div>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Patient ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="patient ID number"
                  autoFocus
                  onChange={(e) => {
                    setPtId(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Provider's note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
             setTimeout(() => {
                     handleClose() 
                    }, 2000);
                axios
                  .post(
                    `http://localhost:5000/notes/`,
                    { user_id: ptId, note },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((result) => {
                    dispatch(addNotes(result.data.data[0]));
                 notifySucc()
                    
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Save Note
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="myNotesContainer">
          {notes ? (
            notes.map((note, i) => {
              return (
                <div key={i} className="pNote">
                  <div>
                    <span>Client Id:{note.user_id}</span>
                    <p>
                      <span>
                        Client's name:
                        <br />
                      </span>
                      {note.firstname} {note.lastname}
                    </p>
                    <p>
                      <span>
                        Client's contact info:
                        <br />
                      </span>
                      <span>Phone number:</span>
                      <br />
                      {note.phonenumber}
                      <br />
                      <span>Email:</span>
                      <br />
                      {note.email}
                    </p>

                    <p>
                      <span>
                        Note: <br />
                      </span>{" "}
                      {note.note}
                     
                    </p>
                 
                    <p>
                      <span>Visitied on</span> {today}
                    </p>
                    <div style={{ display: "flex", flexDirection: "row" ,justifyContent:"space-evenly", cursor:"pointer"}}>
                      <div
                      onClick={()=>{
                        axios.delete( `http://localhost:5000/notes/${note.provider_note_id}`, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                        .then((result)=>{
                          dispatch(deleteNotesById(note.provider_note_id))
                        notifyErr()
                         
                        })
                        .catch((error)=>{
                          console.log(error);
                        })
                      }}
                      >
                        ❌
                      </div>
                      <div
                      onClick={()=>{
                       setEdit(note.provider_note_id)
                        axios.put( `http://localhost:5000/notes/${note.provider_note_id}`,{note:updatedNote ,user_id:note.user_id}, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                        .then((result)=>{
                          dispatch(updateNotes({note:updatedNote,id:note.provider_note_id}))
                            setInput(!Input)
                     
                        })
                        .catch((error)=>{
                          console.log(error);
                        })
                      }}
                      
                      >✏️</div>
                         {edit==note.provider_note_id&&Input&&<input type="text" placeholder="updated note" onChange={(e)=>{
                        setUpdatedNote(e.target.value)
                      }}></input>}
                    </div>
                   
                  </div>
                
                </div> 
              );
            })
          ) : (
            <MDBSpinner color="danger">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          )}
        </div> 
         
      </div>
      <ToastContainer/>
     
    </>
  );
};
export default Note;
