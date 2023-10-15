import React ,{useEffect,useState} from 'react'
import { useParams ,useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./style.css"
import { MDBSpinner } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from "react-redux";
;
import Button from "react-bootstrap/Button";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
const Provider = () => {
    const [provider ,setProvider]=useState([])
    const [loder, setLoder] = useState(false)
    const history =useNavigate()
    const { token, isLoggedIn} = useSelector((state) => {
        return {
          token: state.auth.token,
          isLoggedIn: state.auth.isLoggedIn,
          
        };
      });
const {id}=useParams()
useEffect(()=>{
axios.get(`http://localhost:5000/provider_info/category/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((result)=>{
    setProvider(result.data.result)
    setLoder(true)
}).catch((err)=>{
    console.log(err);
})
},[id])


if(!loder){
    return <MDBSpinner color='danger'>
     <span className='visually-hidden'>Loading...</span>
   </MDBSpinner>
   }
  return (
    <section className="section h-100" >
    <div >
        {/* <h4 className='title' >{provider[0].category}</h4> */}
        <div className='provider'>
        {provider.map((prov,i)=>{
            return (
                <div key={i} >
                    <MDBCard className='card'>
      <MDBCardImage src={prov.img} height={350}  position='top' alt='...' />
      <MDBCardBody>
        <MDBCardTitle>Name : {prov.fname} {prov.lname}</MDBCardTitle>
        <MDBCardText>
          Category :{prov.category}
        </MDBCardText>
        <MDBBtn  onClick={()=>{
            history(`/provider_Information/${prov.provider_id}`)
        }}>MORE INFO</MDBBtn>
      </MDBCardBody>
    </MDBCard>
                   
                    

                </div>
            )
        })}
        </div>
    </div>
    <Button outline  
                    color="primary"
                    className="ms-1 position-relative"
                    onClick={() => {
                      history(-1);
                    }}
                  >
                    <MDBIcon fas icon="arrow-circle-left"  size='lg'/>
                  </Button>
    </section>
  )
}

export default Provider