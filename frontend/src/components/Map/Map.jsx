import GoogleMapReact from "google-map-react";
import React from "react";
import { useEffect } from "react";
import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
  import { setLocation } from "../../service/redux/reducers/order";
  import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Marker = ({ text }) => <div style={{ fontSize: "24px" }}>{text}</div>;
const Map = () => {
  const [myLon, setmyLon] = useState("");
const dispatch =useDispatch() 
const history = useNavigate()
const { location } = useSelector((state) => {
  return {
    location: state.orders.location,
  };
});
  useEffect(() => {

    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }));
    });
  }, []);

  const defaultProps = {
    center: {
      lat: 31.945368,
      lng: 35.928371,
    },
    zoom: 7,
  };
  const notifySucc = () =>
  toast.success("Location Added Successfully", {
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
    // Important! Always set the container height explicitly
    <div style={{ height: "70vh", width: "70%" }}>
      {location && (
        <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals={true}
          onClick={(e) => {
            const { lat, lng } = e;
            dispatch(setLocation({ lat, lng }));
        notifySucc()
          }}
          bootstrapURLKeys={{ key: "AIzaSyBW1nDKAK6Pttb8-Hwxqi28KxCjGlIUxTc" }}
          // center={location}
          defaultCenter={defaultProps.center}
          
          defaultZoom={11}
        >
          <Marker lat={location.lat} lng={location.lng}  text="📍" />
        </GoogleMapReact>
      )}
      <ToastContainer/>
    </div>
  );
};
export default Map;
