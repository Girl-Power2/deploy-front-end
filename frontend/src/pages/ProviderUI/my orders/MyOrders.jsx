import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MDBSpinner } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import "./style.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [today, setToday] = useState();
  const [count, setCount] = useState(3);
  const [created, setCreated] = useState();

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
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/orders/provider/${providerId}/?skip=${count}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setOrders(result.data.result);

        setToday(result.data.result[0].date.toString().split("T")[0]);
        setCreated(result.data.result[0].created_at.toString().split("T")[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [count]);
  return (
    <>
      <div className="ordersContainer">
        {orders ? (
          orders.map((order, i) => {
            return (
              <>
                <div key={i} className="pOrder">
                  <p><span> Order created at:</span> {created}</p>
                  <p> <span>Schedule Id:</span> {order.schedule_id}</p>
                  <p><span>Service:</span> {order.service}</p>
                  <p><span>Price: </span>{order.price_per_hour}</p>
                  <p> <span>Provider Id:</span> {order.provider_id}</p>
                  <p> <span>Client Id:</span> {order.user_id}</p>
                  <p>
                 
                    <span>User Name:</span> {order.firstname}
                    {order.lastname}
                  </p>
                  <p><span> User Contact number:</span> {order.phonenumber}</p>
                  <p><span>Address: </span>{order.address}</p>
                  <p><span>Appointment date:</span> {today}</p>
                  <p><span> Time from:</span> {order.time_from}</p>
                  <p><span>Time to:</span> {order.time_to}</p>
                </div>
              </>
            );
          })
        ) : (
          <MDBSpinner color="danger">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        )}
      </div>
     {orders.length>0?<div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100vw",
          justifyItems: "center",
          padding: "2rem",
        }}
      >
        <Button
          onClick={() => {
            if (count >= 3 && count > 0) {
              setCount(count - 3);
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
          Previous
        </Button>
        <Button
        
          onClick={() => {
            setCount(count + 3);
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
        </div>:<p>You don't have any orders yet</p>}
    </>
  );
};

export default MyOrders;
