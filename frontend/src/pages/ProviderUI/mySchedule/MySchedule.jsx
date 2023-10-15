import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { MDBSpinner } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addSchedule,
  deleteSchedule,
  setBookedCounter,
  setSchedule
} from "../../../service/redux/reducers/schedule";
import React from "react";
import Table from "react-bootstrap/Table";

//====================component function=============================
const AddSchedule = () => {
  const [timeFrom, setTimeFrom] = useState("24:00");
  const [timeTo, setTimeTo] = useState("24:00");
  const [msg, setMsg] = useState("");
  const [date, setDate] = useState("");
  const [myDates, setMyDates] = useState("");
  const [today, setToday] = useState("");
  // const [mySchedule, setMySchedule] = useState("");
  const [show, setShow] = useState(false);
  const [isBooked, setIsBooked] = useState("");

  const { schedule } = useSelector((state) => {
    return { schedule: state.schedule.schedule };
  });
  const { BookedCounter } = useSelector((state) => {
    return { BookedCounter: state.schedule.BookedCounter };
  });
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
  //====================end of states=============================
  const notifySucc = () =>
  toast.success("Schedule Add Successfully", {
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
    'Schedule Deleted Successfully',
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
  //====================outer functions start=============================

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setToday(new Date().toISOString().split("T")[0]);
    setShow(true);
  };
  const dispatch = useDispatch();
  //====================get booked schedules count start=============================
  const getBookedCount = () => {
    axios
      .get(
        `http://localhost:5000/schedules/CountBookedByProvider/${providerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) =>
        dispatch(setBookedCounter(result.data.data[0].bookedcount))
      )
      .catch((err) => console.log(err));
  };

  //====================get booked schedules count end=============================

  //====================get schedules start=============================

  const getSchedules = () => {
    axios
      .get(`http://localhost:5000/schedules/ByProvider/${providerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {

        dispatch(setSchedule(result.data.data))
        setMyDates(new Date().toISOString().split("T")[0])
        setIsBooked(result.data.data.booked);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //====================get schedules end=============================

  //====================use effect start=============================
  useEffect(() => {
    
    getSchedules();
    getBookedCount();
  }, [schedule, BookedCounter]);

  //====================use effect end=============================

  //====================function to add 1 to nubmer of cols=============================
  let num = 0;
  const incNum = () => {
    if (myDates) {
      num++;
    }
    return num;
  };

  //====================function to add 1 to nubmer of cols=============================

  //====================add schedules start=============================

  const addSchedules = () => {
    axios
      .post(
        `http://localhost:5000/schedules/`,
        { time_from: timeFrom, time_to: timeTo, DATE: date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((result) => {
        dispatch(
          addSchedule({ time_from: result.data.data[0].time_from, time_to: result.data.data[0].time_to, DATE: result.data.data[0].date })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //====================add schedules end=============================

  //====================outer functions end=============================
  return (
    <>

      <div className="myScheduleContainer">
        <div className="step">
          <Button variant="primary" onClick={handleShow}>
            Add schedule
          </Button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <div className="inputs">
            <label>
              Date:
              <input
                type="date"
                min={today}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              ></input>
            </label>
            <label>
              From:
              <input
                type="time"
                min="08:00"
                max="23:00"
                step="3600"
                placeholder="08:00"
                name="time_from"
                required
                pattern="[0-9]{2}:[0-9]{2}"
                onChange={(e) => {
                  setTimeFrom(e.target.value);
                }}
              />
            </label>
            <label>
              To:
              <input
                type="time"
                min="09:00"
                max="00"
                step="3600"
                name="time_to"
                placeholder="09:00"
                pattern="[0-9]{2}:[0-9]{2}"
                required
                onChange={(e) => {
                  setTimeTo(e.target.value);
                }}
              />
            </label>

            <Button
              as="input"
              type="submit"
              value="Submit"
              onClick={() => {
                addSchedules();
                notifySucc()
                setTimeout(() => {
                 handleClose() 
                }, 2000);
              }}
            />
          </div>
        </Modal>

        {schedule ? (
          <>
            <div className="tableContainer">
              <Table>
              <thead>
              <tr>
                <th>
                  {" "}
                  {schedule[0]?.fname[0].toUpperCase()}
                  {schedule[0]?.fname.slice(1)}{" "}
                  {schedule[0]?.lname[0].toUpperCase()}
                  {schedule[0]?.lname.slice(1)}'s schedule{" "}
                </th>
                
              </tr></thead>
              <tr>
              <th>Number of booked appointments:{BookedCounter}</th></tr></Table>
              <Table
                responsive="md"
                bordered="true"
                hover="true"
                variant="light"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Time From</th>
                    <th>Time To</th>
                    <th>Delete</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {schedule.map((sc, i) => {
                 
                  return (
                    <tbody>
                      <tr>
                        <td>{incNum()}</td>
                        <td>{sc.date&&sc.date?.toString().split("T")[0]}</td>
                        <td>{sc.time_from}</td>
                        <td>{sc.time_to} </td>
                        <td
                          autoFocus
                          className="btn1"
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:5000/schedules/ById/${sc.schedule_id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then((result) => {
                                dispatch(deleteSchedule(sc.schedule_id));
                                notifyErr()
                          })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          ❌
                        </td>
                        <td id={sc.booked == true ? "green" : "red"}>
                          {sc.booked == true ? "Booked" : "Not Booked"}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </div>
          </>
        ) : (
          <MDBSpinner color="success">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        )}
      </div>
      <ToastContainer/>
    </>
  );
};

export default AddSchedule;
