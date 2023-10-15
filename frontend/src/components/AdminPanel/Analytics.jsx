import React, { useEffect, useState ,useRef} from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend ,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from "axios";
import BarChart from "./BarChart";
import 'chart.js/auto';
import PieChart from "./PieChart"
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale);

import {
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardHeader,
  MDBCardText
} from 'mdb-react-ui-kit';


const Analytics = () => {
  const [users, setUsers] = useState(0);
  const [provider, setProvider] = useState(0);
  const [category, setCategory] = useState(0);
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const getUsers = () => {
    axios
      .get(`http://localhost:5000/users/conutOfUsers/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setUsers(result.data.result[0].count);
      })
      .catch((err) => {
        console.log(err);
      });
  };
// ========================Get count functions start====================================
  const getProvider = () => {
    axios
      .get(`http://localhost:5000/providers/all/count/`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setProvider(result.data.data[0].numberofproviders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategory = () => {
    axios
      .get(`http://localhost:5000/categories/countAllCategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setCategory(result.data.result[0].count);
      })
      .catch((err) => {
        console.log(err);
      });
  };
// ========================Get count functions end====================================



// ========================Get all functions end====================================

  // =========================use effect=============================
  useEffect(() => {
    getUsers();
    getProvider();
    getCategory();
   
  }, []);
  // =========================use effect=============================
  /*=================pie===============*/
  const [Data, setData] = useState({
     labels: ['female', 'male'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235,1)',
       
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      
      ],
      borderWidth: 1,
    },
  ],
  });
 
/*================= chart===============*/
const [chartData, setChartData] = useState({
  labels: ['Jul', 'Aug', 'Sep', 'Oqt', 'Nov', 'Des'],
    datasets: [
      {
        label: 'First dataset',
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)'
      },
      {
        label: 'Second dataset',
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: '#742774',
      },
    ],  borderWidth: 1
});


  return (

  <div className="chartContainer">
    <div className="cardsContainer">
       <MDBCard background='secondary' className='adminCard text-white mb-3' id="userCard" style={{backgroundColor:"#6a72a3fa"}}>
        <MDBCardHeader>Number of Users</MDBCardHeader>
        <MDBCardBody>
          <MDBCardTitle className="result" style={{ fontSize: "2rem" }}>{users}</MDBCardTitle>
         
        </MDBCardBody>
      </MDBCard>
      <MDBCard background='secondary' className='adminCard text-white mb-3' id="providerCard">
        <MDBCardHeader>Number of Providers</MDBCardHeader>
        <MDBCardBody>
          <MDBCardTitle className="result" style={{ fontSize: "2rem" }}>{provider}</MDBCardTitle>
         
        </MDBCardBody>
      </MDBCard>
      <MDBCard background='secondary' className='adminCard text-white mb-3'  id="categoryCard">
        <MDBCardHeader>Number of Categories</MDBCardHeader>
        <MDBCardBody>
          <MDBCardTitle className="result" style={{ fontSize: "2rem" }}>{category}</MDBCardTitle>
         
        </MDBCardBody>
      </MDBCard>
 
     
    </div>
    <div className="chart">
    <div>
  <PieChart Data={Data} />
  </div>
    <div>
     <BarChart chartData={chartData}/>
     </div>
     </div>
    </div>
  );
};

export default Analytics;
