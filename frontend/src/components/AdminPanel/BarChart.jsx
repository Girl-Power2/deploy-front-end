import { Bar } from "react-chartjs-2";
const BarChart = ({chartData}) => {
   
  return (
    <div className="chart-container">
     
      <Bar style={{width:"45vw" ,height:"70vh"}}
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2023"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

export default BarChart