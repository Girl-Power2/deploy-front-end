import React,{useEffect,useState}from 'react'
import axios from 'axios';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBSpinner,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/esm/Button';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


const Addcategory = () => {
const[img,setImg]=useState("")
const [category ,setCategory]=useState([])
const [basicModal, setBasicModal] = useState(false);
const toggleShow = () => setBasicModal(!basicModal);
const [url, setUrl] = useState("");
const [categ ,setCateg]=useState("")

const insert_info = (urlFile) => {
  axios.post(`http://localhost:5000/categories/`,{category:categ ,img:urlFile}).then((result)=>{
  }).catch((err)=>{
    console.log(err);
  })
}

const uploadImage = () => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "g9fkkaot");
    data.append("cloud_name", "drzcyo3sv");
    axios
      .post("https:api.cloudinary.com/v1_1/drzcyo3sv/image/upload", data)
      .then((res) => {
        insert_info(res.data.url);
        setUrl(res.data.url);
      })
      .catch((err) => console.log(err));
  };

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

if(category.length == 0){
 return <MDBSpinner color='danger'>
  <span className='visually-hidden'>Loading...</span>
</MDBSpinner>
}
  return (
    <div>
      <br/>
      <MDBBtn onClick={toggleShow}>Add New Category</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add New Category</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody> 
               <MDBInput label='Name of Category' id='form1' type='text' onChange={(e)=>{
                setCateg(e.target.value)
               }} />
               </MDBModalBody>
               <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Insert your image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                setImg(e.target.files[0])
                  
                }}
              />
            </Form.Group>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => {
                  if (img) {
                    uploadImage();
                  } else {
                    insert_info();
                  }
                  toggleShow()
                }}>Insert Data</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    <div className='category'>
      
      {category&&category.map((data,i)=>{
        return (<div >
      <MDBRow >
    <MDBCol>
      <MDBCardBody>
      <MDBCard className='h-75'>
        <MDBCardImage
          src={data.img}
          height={150}
          width={100}
          position='top'
        />
        
          <MDBCardTitle>{data.category}</MDBCardTitle>
        </MDBCard>  
        </MDBCardBody>
     <MDBBtn color='danger' onClick={()=>{
      axios.delete(`http://localhost:5000/categories//delete/${data.category_id}`).then((result)=>{
      }).catch((err)=>{
        console.log(err);
      })
     }}>
      <MDBIcon  class="fas fa-trash-arrow-up"></MDBIcon>
     </MDBBtn>
    </MDBCol>
   
    
  </MDBRow></div>)
      })}

      </div>
      </div>
  )
}

export default Addcategory