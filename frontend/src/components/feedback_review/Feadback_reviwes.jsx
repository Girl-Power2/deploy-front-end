import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  setReview,
  addReview,
  updateReview,
  deleteReviewById,
} from "../../service/redux/reducers/reviews";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
  MDBTypography,
  MDBCardText,
  MDBSpinner,
} from "mdb-react-ui-kit";

const Feadback_reviwes = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState();
  const [post, setPost] = useState("");
  const history = useNavigate();
  const [time ,setTime]=useState("")
  const [update, setUpdate] = useState("");
  const [data, setData] = useState(false);
  const { token, userId } = useSelector((state) => {
  
    return {
      token: state.auth.token,
      userId: state.auth.userId,
     
    };
  });
  
  const { reviews } = useSelector((state) => {
    return {
      reviews: state.reviews.reviews,
    };
  });
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/reviews/provider/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setData(true);
        dispatch(setReview(result.data.result));
        setTime(result.data.result[0].created_at.toString().split('T')[1])
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reviews]);



  const notifySucc = () =>
  toast.success("Your reviwe Add Successfully", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const notifyUpdat = () =>
  toast.success("Your reviwe Updated Successfully", {
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
    'Your Reviwe Was Deleted ',
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

  if (!data) {
    return (
      <MDBSpinner color="danger">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
  return (
    <div >
      <section className="vh-75" >
        <MDBRow style={{justifyContent:"center"}}>
          <MDBCol sm="9">
            <MDBCard>
              <MDBCardBody className="p-4">
                <div className="d-flex flex-start w-100">
                  <MDBCardImage
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://cdn.vectorstock.com/i/1000x1000/35/72/young-woman-sick-with-fever-avatar-character-vector-31733572.webp"
                    
                    width="65"
                    height="65"
                  />

                  <div className="w-100">
                    <MDBTypography tag="h5">Add Your Opinion </MDBTypography>

                    <MDBTextArea
                      label="What is your view?"
                      rows={4}
                      onChange={(e) => {
                        setPost(e.target.value);
                      }}
                    />

                    <div className="d-flex justify-content-between mt-3">
                      
                      <MDBBtn
                        color="success"
                        onClick={() => {
                          axios
                            .post(
                              `http://localhost:5000/reviews/`,
                              {
                                review: post,
                                user_id: userId,
                                provider_id: id,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            )
                            .then((result) => {
                              notifySucc()
                              dispatch(addReview(result.data.result));
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Add <MDBIcon fas icon="long-arrow-alt-right ms-1" />
                      </MDBBtn>
                      <MDBBtn color="success" onClick={()=>{
                        history(-1)
                      }}><MDBIcon fas icon="arrow-circle-left" /></MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol sm="9">
            <MDBCard className="mb-1 position-relative">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol>
                    <MDBTypography tag="h5">Reviews</MDBTypography>
                  </MDBCol>

                  {reviews?.length > 0 &&
                    reviews.map((comment, i) => {
                      
                      return (
                        <div key={i}>
                          <MDBCol sm="3">
                            <MDBTypography tag="h5">
                              {comment?.firstname} {comment?.lastname}
                            </MDBTypography>{" "}
                          </MDBCol>

                          <MDBCol sm="6">
                            <MDBCardText className="text-muted">
                              Patient's Number :{comment?.user_id}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol sm="6">
                            <MDBCardText className="text-muted">
                              review :{comment?.review}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol sm="6">
                            <MDBCardText className="text-muted">
                              Created_at :{time}
                            </MDBCardText>
                          </MDBCol>

                          {comment?.user_id == userId ? (
                            <div>
                              <MDBBtn
                                color="danger"
                                onClick={() => {
                                  axios
                                    .delete(
                                      `http://localhost:5000/reviews/${comment.review_id}`,
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    )
                                    .then((result) => {
                                      dispatch(
                                        deleteReviewById(comment.review_id)
                                        
                                      );
                                      notifyErr()
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                              >
                                {" "}
                                <MDBIcon fas icon="trash" />
                              </MDBBtn>
                              {toggle === comment?.review_id ? (
                                <MDBBtn className="ms-1"
                                  color="success"
                                  onClick={() => {
                                    axios
                                      .put(
                                        `http://localhost:5000/reviews/user/${comment.review_id}`,
                                        { review: update },
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`,
                                          },
                                        }
                                      )
                                      .then((result) => {
                                        setToggle(false);
                                        dispatch(
                                          updateReview({
                                            review: result.data.result[0].review,
                                            review_id: comment.review_id,
                                          })
                                        );
                                        notifyUpdat()
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                      });
                                  }}
                                >
                                  <MDBIcon far icon="edit" /> Edit
                                </MDBBtn>
                              ) : (
                                <MDBBtn className="ms-1"
                                  color="success"
                                  onClick={() => {
                                    setToggle(comment?.review_id);
                                  
                                  }}
                                >
                                 <MDBIcon far icon="edit" /> Edit
                                </MDBBtn>
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                          {toggle===comment?.review_id ? (
                            <form>
                              <MDBTextArea
                                label="Update your view?"
                                rows={4}
                                onChange={(e) => {
                                  setUpdate(e.target.value);
                                }}
                              />
                            </form>
                          ) : (
                            <></>
                          )}
                          <hr />
                        </div>
                      );
                    })}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
       
      </section>
      <ToastContainer/>
    </div>
  );
};

export default Feadback_reviwes;
