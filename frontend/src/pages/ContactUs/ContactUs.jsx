import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./style.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { MDBInput, MDBCheckbox,  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn } from "mdb-react-ui-kit";


const ContactUs = () => {
    const [messg, setMessg] = useState("");
   
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
  
    
  
    const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
        emailjs
        .sendForm(
          "service_j5381wl",
          "template_mh4x3ik",
          form.current,
          "OvNxWqM4ZNoMso80y"
        )
        .then(
          (result) => {
            setMessg("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
            setMessg("FAILED...");
          }
        );
    };
  
    return (
        <div className="formContact" style={{backgroundColor:'#0097A7'}}>
          
      
         
       
        <MDBRow>
        <MDBCol sm='6'>
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Contact Us</MDBCardTitle>
            <MDBCardText style={{textAlign:"left"}}>
          
       
If you have any questions about us, our reviews, or just want to say hello, please feel free to reach out to us using the contact form below!
If you have specific comments about our reviews, we'd encourage you to leave the comment in the comment section below each of our articles so we can share / exchange ideas for everybody to see and participate!
If you have any technical questions about how to use specific elements of a website
builder, to get the best and most accurate answer, we suggest you reach out to the website builder's dedicated support team or support center - since they know their product the best!

            </MDBCardText>
            
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol sm='6'>
        <MDBCard >
          <MDBCardBody>
            <MDBCardTitle>Contact Us Form</MDBCardTitle>
            <MDBCardText>
            <form ref={form} onSubmit={sendEmail} >
          <MDBInput
            id="form4Example1"
            className="w-100"
            wrapperClass="mb-4"
            type="text"
            name="user_name"
            label="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <MDBInput
            type="email"
            id="form4Example2"
            name="user_email"
            wrapperClass="mb-4"
            label="Email address"
            className="w-100"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            name="message"
            textarea
            id="form4Example3"
            rows={4}
            label="Message"
            className="w-100"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
  
          <MDBCheckbox
            wrapperClass="d-flex justify-content-center mb-4"
            id="form4Example4"
            label="Send me a copy of this message"
            defaultChecked
          />
         
  
          <MDBInput 
            type="submit"
            value="Send"
            style={{backgroundColor:"teal",color:"white"}}
           
          />
        </form>
            </MDBCardText>
           
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
     
    </MDBRow>
     </div>
     
    );
  };
  
  export default ContactUs;