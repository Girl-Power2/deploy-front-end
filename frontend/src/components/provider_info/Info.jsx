import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { MDBCard, MDBCardBody, MDBContainer } from "mdb-react-ui-kit";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { setInfo } from "../../service/redux/reducers/provider_info";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Info = () => {
  // ============================common states=================================
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [img, setImg] = useState("");
  const [bio, setBio] = useState("");
  const [qua, setQua] = useState("");
  const [click, setClick] = useState(true);

  const { providerId, token } = useSelector((state) => {
    return {
      providerId: state.auth.providerId,
      token: state.auth.token,
    };
  });

  // ============================common states=================================

  // ======================first modal states and functions================

  const [url, setUrl] = useState("");

  const insert_info = (urlFile) => {
    axios
      .post(
        `http://localhost:5000/provider_info`,
        {
          bio: bio || "",
          qualifications: qua || "",
          img: urlFile || "",
          provider_id: providerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(
          setInfo({
            bio,
            qua,
            urlFile,
            providerId,
          })
        );
        setMsg({ success: true, msg: result.data.message });
      })
      .catch((err) => {
        setMsg({ success: false, msg: err.result.data.message });
      });
  };
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "g9fkkaot");
    data.append("cloud_name", "drzcyo3sv");
    axios
      .post("https:api.cloudinary.com/v1_1/drzcyo3sv/image/upload", data)
      .then((res) => {
        insert_info(res.data.url);
        setUrl(res.data.url);
      })
      .catch((err) => console.log(err));
  };

  const notifySucc = () =>
    toast.success("Info Add Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  // ======================first modal states and functions================

  // ======================second modal states and functions================

  // ======================second modal states and functions================

  return (
    <>
      <div
        className="welcome"
        style={{ height: "1%", backgroundColor: "#E0F2F1" }}
      >
        Welcome to our team . Please follow the steps to setup your account
      </div>

      {/* ============================start of first modal==================================================*/}

      <MDBContainer
        fluid
        className="py-5"
        style={{
          backgroundColor: "#E0F2F1",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div className="main-timeline">
          <div className="timeline left">
            <MDBCard
              style={
                click
                  ? {
                      boxShadow: "2px 3px 3px 1px black",
                      border: "4px groove #A9CBC8",
                    }
                  : { boxShadow: "none" }
              }
              onClick={() => {
                setClick(false);
              }}
            >
              <MDBCardBody className="p-8">
                <h4
                  style={{ cursor: "pointer" }}
                  onClick={handleShow}
                  className="mb-0"
                >
                  Insert your information
                </h4>

                <div className="input_container">
                  <Modal show={show} onHide={handleClose}>
                    <div className="inputs">
                      <Modal.Body>
                        <InputGroup>
                          <InputGroup.Text style={{ marginBottom: "3rem" }}>
                            Bio
                          </InputGroup.Text>
                          <Form.Control
                            as="textarea"
                            aria-label="Bio"
                            autoFocus
                            onChange={(e) => {
                              setBio(e.target.value);
                            }}
                          />
                        </InputGroup>

                        <InputGroup>
                          <InputGroup.Text style={{ marginBottom: "2rem" }}>
                            Qualifications
                          </InputGroup.Text>
                          <Form.Control
                            as="textarea"
                            aria-label="Qualifications"
                            autoFocus
                            onChange={(e) => {
                              setQua(e.target.value);
                            }}
                          />
                        </InputGroup>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Label>Insert your image</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(e) => {
                              setImg(e.target.files[0]);
                            }}
                          />
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          as="input"
                          type="submit"
                          value="Submit"
                          onClick={() => {
                            if (img) {
                              uploadImage();
                              handleClose();
                              notifySucc();
                            } else {
                              insert_info();
                              handleClose();
                              notifySucc();
                            }
                          }}
                        />

                        <Button variant="primary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </div>
                  </Modal>

                  {/* ============================end of first modal==================================================*/}
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      </MDBContainer>
      <ToastContainer />
    </>
  );
};

export default Info;

//
//
