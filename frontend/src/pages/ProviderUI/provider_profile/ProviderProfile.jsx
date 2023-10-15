import axios from "axios";
import { MDBSpinner } from "mdb-react-ui-kit";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateBio,
  updateQualifications
} from "../../../service/redux/reducers/provider_info";
const ProviderProfile = () => {
  const [information, setInformation] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [img, setImg] = useState("");
  const [today, setToday] = useState("");
  const [bio, setBio] = useState("");

  const [qualifications, setQualifications] = useState("");

  const { providerId } = useSelector((state) => {
    return {
      providerId: state.auth.providerId,
    };
  });
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const { info } = useSelector((state) => {
    return { info: state.info.info };
  });
  const get_info = () => {
    axios
      .get(`http://localhost:5000/provider_info/${providerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
const i=result.data.result.length-1
      setInformation(result.data.result[i])
        setImg(result.data.result[i]?.img);
        setToday(result.data.result[i].birthdate.toString().split("T")[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    get_info();
  }, []);

  const notifyUpdat = () =>
  toast.success("Your Info Updated Successfully", {
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
    <>
      {information ? (
        <div className="infoContainer">
          <div className="providerImg">
            <img className="imgMyProfile" src={information?.img}></img>
            <div className="fontOfProviderProvile">
            <p>
              {information.fname}  {information.lname}<br />
          </p>
            contact infomarmation: <br />
            
            <p><span>📞</span>{information.phonenumber}</p>
            <p>📧{information.email}</p></div>
          </div>
          <div className="about">
              <div className="bio">
<div className="bioSection">
                bio:
                <br />
                
                {information.bio}</div>
                {show1 ? (
                  <div>
                  
                    <div style={{zIndex:"1"}}
                      onClick={() => {
                        setShow1(!show1);
                      }}
                    >
                      ✏️
                    </div>
                    <input
                      type="text"
                      autoFocus
                      placeholder="upadate your bio"
                      style={{ borderRadius: ".5rem", width: "100%" }}
                      onChange={(e) => {
                        setBio(e.target.value);
                      }}
                    />
                    <p
                      onClick={() => {
                        axios
                          .put(
                            `http://localhost:5000/provider_info/${information.provider_info_id}`,
                            {
                              bio,
                              qualifications,
                              img: img || null,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          )
                          .then((result) => {
                              updateBio({
                                bio:result.data.result[0].bio,
                                id: information.provider_info_id,
                              })
                              notifyUpdat()
                              
                              get_info()
                          })
                          .catch((err) => console.log(err));
                        setShow1(!show1);

                      }}
                    >
                      ✅
                    </p>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setShow1(!show1);
                    }}
                  >
                    ✏️
                  </div>
                )}
              </div>
            <div className="bio">
              
                qualifications:
                <br />
                {information.qualifications}
           

              {show2 ? (
                <div>
                  <div
                    onClick={() => {
                      setShow2(!show2);
                    }}
                  >
                    ✏️
                  </div>
                  <input
                    type="text"
                    autoFocus
                    placeholder="upadate your qualifications"
                    style={{ borderRadius: ".5rem", width: "100%" }}
                    onChange={(e) => {
                      setQualifications(e.target.value);
                    }}
                  />
                 <p
                      onClick={() => {
                        axios
                          .put(
                            `http://localhost:5000/provider_info/${information.provider_info_id}`,
                            {
                              bio,
                              qualifications,
                              img: img || null,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          )
                          .then((result) => {
                         
                              updateQualifications({
                                qualifications: result.data.result[0].qualifications,
                                id: information.provider_info_id,
                              })
                              notifyUpdat()
                              get_info()
                          })
                          .catch((err) => console.log(err));
                        setShow2(!show2);

                      }}
                    >
                      ✅
                    </p>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setShow2(!show2);
                  }}
                >
                  ✏️
                </div>
              )}
            </div>
            <div className="bio">
              📍Address <br />
              {information.city[0].toUpperCase()}
              {information.city.slice(1)}
            </div>
            <div className="bio">
              📅birthdate:
              <br />
              {today}
            </div>
            <div className="bio">
              age:
              <br />
              {information.age.years}
            </div>
          </div>
        </div>
      ) : (
        <MDBSpinner color="success">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      )}
      <ToastContainer/>
    </>
  );
};

export default ProviderProfile;
