import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBSpinner } from "mdb-react-ui-kit";
import { setService } from "../../service/redux/reducers/services";
import Button from "react-bootstrap/Button";
import "./style.css";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBtn,
  MDBIcon
} from "mdb-react-ui-kit";

const ProviderSesvice = () => {
  const history = useNavigate();
  const [sort, setSort] = useState(true);
  const [asc, setAsc] = useState(false);
  const [desc, setDesc] = useState(false);
  const [dataAsc ,setDataAsc]=useState([])
  const[dataDesc ,setDataDesc]=useState([])
  const { service } = useSelector((state) => {
    return {
      service: state.services.service,
    };
  });
  const dispatch = useDispatch();
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/services/byId/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setService(result.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (service.length == 0) {
    return (
      <MDBSpinner color="success">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
  return (
    <div>
      <Button outline
      className="ms-1"
        onClick={() => {
          axios
            .get(`http://localhost:5000/services/price_ASC/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((result) => {
              setSort(false);
              setAsc(true);
              setDesc(false)
              setDataAsc(result.data.data)
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
     <MDBIcon fas icon="sort-numeric-down" size='2x'/>
      </Button>
      <Button className="ms-1"
        outline
        onClick={() => {
          axios
            .get(`http://localhost:5000/services/price_DESC/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((result) => {
              setSort(false);
              setDesc(true);
              setAsc(false)
              setDataDesc(result.data.data)
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
      <MDBIcon fas icon="sort-numeric-down-alt"  size='2x'/>
      </Button>
      {asc ? (
        <MDBRow>
          <MDBCol md="12">
            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-4">Services</MDBCardText>
                {dataAsc.map((data, i) => {
                  return (
                    <div key={i}>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText >Services</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {data.service}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Price_Per_Hour</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {data.price_per_hour} JD
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </div>
                  );
                })}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      ) : (
        <></>
      )}
      {sort ? (
        <MDBRow>
          <MDBCol md="12">
            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-4">Services</MDBCardText>
                {service.map((data, i) => {
                  return (
                    <div key={i}>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Services</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {data.service}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Price_Per_Hour</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {data.price_per_hour} JD
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      {/* <hr /> */}
                    </div>
                  );
                })}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      ) : (
        <></>
      )}
       {desc ? (
        <MDBRow>
          <MDBCol md="12">
            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-4">Services</MDBCardText>
                {dataDesc.map((data, i) => {
                  return (
                    <div key={i}>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Services</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {data.service}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Price_Per_Hour</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {data.price_per_hour} JD
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </div>
                  );
                })}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProviderSesvice;
