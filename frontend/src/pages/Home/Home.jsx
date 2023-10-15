import "./style.css";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import React from "react";
import {
  MDBFooter,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBContainer,
  MDBTypography,
} from "mdb-react-ui-kit";

function Home() {
  const history = useNavigate();
  return (
    <div style={{ overflowX: "hidden" }}>
      <header className="HeaderHome">
        <Carousel fade indicators={false}>
          <Carousel.Item>
            <img
              className="carouselItem"
              src="https://images.pexels.com/photos/5998445/pexels-photo-5998445.jpeg?auto=compress&cs=tinysrgb"
              alt="What we do"
            />
            <Carousel.Caption className="carousel-caption">
              <p>General Medicine</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carouselItem"
              src="https://blog.servicemarket.com/wp-content/uploads/2022/04/blood-test-at-home-450x250-1.jpg"
              alt="What we do"
            />
            <Carousel.Caption className="carousel-caption">
              <p>Home Laboratory Testing</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carouselItem"
              src="https://images.pexels.com/photos/6111618/pexels-photo-6111618.jpeg?auto=compress&cs=tinysrgb"
              alt="What we do"
            />
            <Carousel.Caption className="carousel-caption">
              <p>Physiotherapy</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carouselItem"
              src="https://www.uaa.alaska.edu/academics/college-of-health/departments/occupational-therapy/_images/header-occupational-therapy-2.jpg"
              alt="What we do"
            />
            <Carousel.Caption className="carousel-caption">
              <p>Occupational Therapy</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carouselItem"

          

              src="https://res.cloudinary.com/drzcyo3sv/image/upload/v1697215521/pexels-singkham-1116050_y9ekx3.jpg"
              alt="What we do"
            />
            <Carousel.Caption className="carousel-caption">
              <p>Baby Sitting</p>

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carouselItem"
              src="https://lirp.cdn-website.com/83ac98e3/dms3rep/multi/opt/Benefits+Of+Speech+Therapy+For+Both+Adults+And+Children-1920w.png"
              alt="What we do"
            />
            <Carousel.Caption className="carousel-caption">
              <p>Speech Therapy</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carouselItem"
              src="https://www.portea.com/static/ad63fb57468502f3461ef225393b7652/43fa5/Nursing-service-in-City-page-big.png"
              alt="What we do"
            />
            <Carousel.Caption className="carousel-caption">
              <p>Nursing</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </header>

      <MDBContainer
        className="py-5 "
        style={{
          backgroundColor: "white",
          marginTop: "1rem",
          borderRadius: "0.5rem",
          height:"60vh"
        }}
      >
        <MDBRow>
          <MDBCol lg="12">
            <div className="horizontal-timeline">
              <MDBTypography listInLine className="items">
                <li className="items-list">
                  <div className="px-4">
                    <div className="event-date badge bg-info">1</div>
                    <MDBIcon fas icon="sign-in-alt" size="3x" color="info" />

                    <p className="text-muted">
                      In order to use the application, please log in or create a
                      new account for new users or service providers. Click on
                      the Join Us rice in the navbar to be able to login
                      <div style={{ color: "white" }}>
                        ddddddddddddddddddddd
                      </div>
                    </p>
                    <h5 className="pt-2">
                      {" "}
                      <MDBIcon far icon="dot-circle" /> Step One
                    </h5>
                  </div>
                </li>
                <li className="items-list">
                  <div className="px-4">
                    <div className="event-date badge bg-success">2</div>
                    <MDBIcon fas icon="info" size="3x" color="success" />

                    <p className="text-muted">
                      After logging in, if you are a user, please enter your
                      Hisory in(my profile)to be able to make orders. If you are
                      a service provider, please follow the steps as shown in
                      your profile.
                    </p>
                    <h5 className="pt-2">
                      {" "}
                      <MDBIcon far icon="dot-circle" /> Step Two
                    </h5>
                  </div>
                </li>
                <li className="items-list">
                  <div className="px-4">
                    <div className="event-date badge bg-danger">3</div>
                    <MDBIcon
                      fas
                      icon="chalkboard-teacher"
                      size="3x"

                      color="danger"/>





                    <p className="text-muted">
                      As a user to be able to make order, you must first choose
                      the service provider and you can search for his name in
                      the search in the navbar. After that press the make order
                      button
                    </p>
                    <div>
                      <h5 className="pt-2">
                        <MDBIcon far icon="dot-circle" /> Step Three
                      </h5>
                    </div>
                  </div>
                </li>

                <li className="items-list">
                  <div className="px-4">
                    <div className="event-date badge bg-warning">4</div>
                    <MDBIcon
                      far
                      icon="calendar-check"
                      size="3x"
                      color="warning"
                    />

                    <p className="text-muted">
                      Finally, after the order process is confirmed, your order
                      will go to the list of orders. After the end of the
                      service, please make sure to press the CheckdOut button.
                      <div style={{ color: "white" }}>
                        ddddddddddddddddddddd
                      </div>
                    </p>
                    <div>
                      <h5 className="pt-2">
                        <MDBIcon far icon="dot-circle" />
                        Step Four
                      </h5>
                    </div>
                  </div>
                </li>
              </MDBTypography>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>


      



        <div className="containerOfContent">
         <div className="containerOfcard">
          <img id="logohome"
            src="https://res.cloudinary.com/drzcyo3sv/image/upload/v1697193618/Provider_4_belyiu.jpg"
            style={{ borderRadius: ".5rem" }}
          /> 
          <article>
            <p
              style={{
                fontSize: "2.5rem",
                fontFamily: "gorgia",
                color: "teal",
                textDecoration: "underline",
              }}
            >
              HOW CAN CURE APP HELP PEPOLE?
            </p>
            Many people who suffer from some diseases may not be able to leave
            the house for some reason or may need medical service urgently and
            cannot go to the care centers and they may have been fedy of many to
            go to these centers and it is easier and faster for the caregiver
            comes to them instead of going to them. Therefore, you have provided
            the ability to book appointments for a number of caregivers who will
            come to your home instead of going to them, so Cure App is an
            application to facilitate life for people.
          </article>
        
      </div>
      </div>
      <div className="homeCard">
        <MDBCard border="dark" className=".shadow-2-strong mb-3 ">
          <MDBCardBody>
            <MDBCardTitle>
              <MDBIcon
                fas
                icon="clinic-medical"
                size="3x"
                style={{ color: "#4DB6AC" }}
              />
            </MDBCardTitle>
            <MDBCardSubTitle
              style={{ fontSize: "1.5rem", fontFamily: "gorgea" }}
            >
              About Us
            </MDBCardSubTitle>
            <MDBCardText style={{ fontSize: "1.1rem", fontFamily: "gorgea" }}>
              We are Cure app for home services, that include health services
              and more.Which are provided by experienced and highly qualified
              providers.
            </MDBCardText>
            <NavLink style={{ color: "#2F4F4F" }} to="/aboutUs">
              {" "}
              More About Us
            </NavLink>
          </MDBCardBody>
        </MDBCard>

        <MDBCard border="dark" shadow="5" className=".shadow-2-strong mb-3 ">
          <MDBCardBody>
            <MDBCardTitle>
              <MDBIcon
                fas
                icon="phone-volume"
                size="3x"
                style={{ color: "#4DB6AC" }}
              />
            </MDBCardTitle>
            <MDBCardSubTitle
              style={{ fontSize: "1.5rem", fontFamily: "gorgea" }}
            >
              Contact Us
            </MDBCardSubTitle>
            <MDBCardText style={{ fontSize: "1.2rem", fontFamily: "gorgea" }}>
              If you have any questions about us, our reviews, or just want to
              say hello, please feel free to reach out to us using the contact
              form below!
            </MDBCardText>
            <NavLink style={{ color: "#2F4F4F" }} to="/contactUs">
              {" "}
              Contact Us
            </NavLink>
          </MDBCardBody>
        </MDBCard>

        <MDBCard border="dark" shadow="5" className=".shadow-2-strong mb-3 ">
          <MDBCardBody>
            <MDBCardTitle>
              <MDBIcon
                fas
                icon="info-circle"
                size="3x"
                style={{ color: "#4DB6AC" }}
              />
            </MDBCardTitle>
            <MDBCardSubTitle
              style={{ fontSize: "1.5rem", fontFamily: "gorgea" }}
            >
              Help
            </MDBCardSubTitle>
            <MDBCardText style={{ fontSize: "1.1rem", fontFamily: "gorgea" }}>
              We are Cure app for home services, that include health services
              and more.Which are provided by experienced and highly qualified
              providers.
            </MDBCardText>
            <NavLink style={{ color: "#2F4F4F" }} to="/aboutUs">
              {" "}
              Help
            </NavLink>
          </MDBCardBody>
        </MDBCard>
      </div>
      <Outlet />

      <MDBFooter
        style={{ backgroundColor: "white" }}
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="twitter" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="google" />
            </a>
            <a
              href="http://linkedin.com/in/hala-joudehabushalbak"
              className="me-4 text-reset"
            >
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>

        <section className="">
          <MDBRow className="mt-5">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Cure App
              </h6>

              <p style={{textAlign:"left"}}>

                App of Health care services which are provided by providers of
                different specialities to a wide range of care seekers at their
                homes ,which makes it easier for the patients to get help.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  Node.js
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Redux
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Css
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  HTML
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  PostgrSQL
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a
                  className="text-reset"
                  onClick={() => {
                    history("/aboutUs");
                  }}
                >
                  About Us
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  onClick={() => {
                    history("/contactUs");
                  }}
                >
                  Contact Us
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Amman , Jordan
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                <a href="duhadahamsheh@gmail.com">duhadahamsheh@gmail.com</a>
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                <a href="halaj.abushalbak@gmail.com">
                  halaj.abushalbak@gmail.com
                </a>
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 962 791 026 868
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 962 798 967 357
              </p>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBFooter>
    </div>
    
  );
}


export default Home;
