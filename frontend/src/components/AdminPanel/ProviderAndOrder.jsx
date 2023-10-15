import React, { useEffect, useState } from "react";
import axios from "axios"
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";
import { MDBSpinner } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";


const ProviderAndOrder = () => {

  const [providers,setProviders]=useState("")
 const [count, setCount] = useState(0);

  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
 

  // ========================Get all functions start====================================
const getAllProviders=()=>{
  axios
  .get(`http://localhost:5000/providers/all/?skip=${count}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((result) => {


    setProviders(result.data.providers);
    setService(result.data.services);
    setOrderCount(result.data.orders);

 
  })
  .catch((err) => {
    console.log(err);
  });
}





// ============use effect================
useEffect(() => {
  
  getAllProviders()

}, [count]);
// ============use effect================
let num = 0;
const incNum = () => {
  if (providers) {
    num++;
  }
  return num;
};
  return (
    <div className="providerAnalyticsContainer">
     <Table bordered hover size="sm">
      <thead>
        <tr>
        <th>#</th>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Category</th>
          </tr>
      </thead>
    {providers?(providers.map((provider,i)=>{

      return (
        <>      
       
          <tbody>
        <tr>
          <td>{incNum()}</td>
          <td>{provider.provider_id}</td>
          <td>{provider.fname}</td>
          <td>{provider.lname}</td>
          <td>{provider.email}</td>
          <td>{provider.phonenumber}</td>
          <td>{provider.category}</td> </tr>
         
          <td></td>
       
      
      </tbody>
        
        
        </>
      )
    })):<MDBSpinner color="danger">
    <span className="visually-hidden">Loading...</span>
  </MDBSpinner>}
  </Table>
  <div
        style={{
          display: "flex",
          justifyContent: "right",
          width: "50vw",
          justifyItems: "right",
          padding: "2rem",
          gap:"3rem"
        }}
      >
        <Button
       
          onClick={() => {
            if (count >= 5 && count > 0) {
              setCount(count - 5);
            } else {
              setCount(0);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="25"
            fill="#F5FFFA"
            class="bi bi-arrow-left-square"
            viewBox="3 3 10 10"
          >
            <path
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>
          Previous{" "}
        </Button>
        <Button
         
          onClick={() => {
            setCount(count + 5);
          }}
        >
          Next{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="25"
            fill="#F5FFFA"
            class="bi bi-arrow-right-square"
            viewBox="3 3 10 10"
          >
            <path
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </Button>
      </div>
  </div>
  
  )
}

export default ProviderAndOrder