import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./app.css";
import axios from "axios";
import { setLogin, setUserId } from "../../../service/redux/reducers/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { decodeToken } from "react-jwt";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
{
}
const LoginUser = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const notifySucc = () =>
  toast.success("Login Successfully", {
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
    'Your Email Or Password Not Correct',
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



  const [google, setGoogle] = useState("");
  const responseMessage = (response) => {
    console.log(response);
    const a = decodeToken(response.credential);
    console.log(a);
    setGoogle(a);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div>
      
      <MDBContainer className="my-4">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              style={{borderRadius:"1"}}
              src="https://www.appstudio.ca/blog/wp-content/uploads/2020/10/Healthcare-Mobile-App-Development.jpg"
              alt="login form"
              className="rounded-start w-100 h-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <span className="h1 fw-bold mb-0">
                 
                </span>
              </div>
              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={() => {
                  
                  axios
                    .post(`http://localhost:5000/users/login`, {
                      email,
                      password,
                    })
                    .then((result) => {
                      setMessage({
                        success: true,
                        message: "login successfully",
                      });
                      console.log(dispatch(setUserId(result.data.userId)));
                      dispatch(setLogin(result.data.token));

                      dispatch(setUserId(result.data.userId));
                      localStorage.setItem("token", result.data.token);
                      localStorage.setItem("userId", result.data.userId);
                       notifySucc()
                     
                      setTimeout(()=>{
                        history("/category");
                      },2000)
                      ;
                    })
                    .catch((err) => {
                      if (err.response && err.response.data) {
                        notifyErr()
                        return setMessage({
                          success: false,
                          message: err.response.data.message,
                        });
                      }
                    });
                }}
              >
                Login
              </MDBBtn>
<hr/>
<MDBBtn className="w-50"
        onClick={() => {
         
          axios
            .post("http://localhost:5000/users/login", {
              email: google.email,
              password: google.azp,
            })
            .then((result) => {
              dispatch(setLogin(result.data.token));

              dispatch(setUserId(result.data.userId));
              localStorage.setItem("token", result.data.token);
              localStorage.setItem("userId", result.data.userId);
              history("/category");
 notifySucc()
            
            })
            .catch((err) => {
              console.log(err);
              notifyErr()
            });
        }}
      >
        <GoogleOAuthProvider clientId="244732940096-98vg905q4amiojtd94ikgdh12rh7p20d.apps.googleusercontent.com">
          <GoogleLogin
              onSuccess={responseMessage}
              onError={errorMessage} 
          />
        </GoogleOAuthProvider>
      </MDBBtn>
              ;
             
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <a
                  
                  style={{ color: "#393f81" }}
                  onClick={() => {
                    history("/user");
                  }}
                >
                  Register here
                </a>
              </p>
             
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
      <ToastContainer />
      </MDBContainer>
    </div>
  );
};

export default LoginUser;
