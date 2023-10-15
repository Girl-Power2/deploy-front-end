import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { MDBSpinner } from "mdb-react-ui-kit";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
} from "mdb-react-ui-kit";
const Categories = () => {
  const [category, setCategory] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/categories/`)
      .then((result) => {
        setCategory(result.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (category.length == 0) {
    return (
      <MDBSpinner color="danger">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  return (
  <section className="section" >
    <div className="collection" >
      {category.map((categ, i) => {
        return (
          
          <div key={i} className="container">
            <MDBCard
              shadow="5-strong"
              border="primary"
              background="white"
              className="mb-1"
            >
              <MDBCardHeader>
                <img
                  src={categ.img}
                  height={250}
                  width={250}
                  style={{cursor:"pointer"}}
                  onClick={() => {
                    history(`/provider/${categ.category_id}`);
                  }}
                />
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardTitle  style={{cursor:"pointer"}} onClick={() => {
                    history(`/provider/${categ.category_id}`);
                  }}>{categ.category}</MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          </div>
        );
      })}
    </div>
    </section>
  );
};

export default Categories;
