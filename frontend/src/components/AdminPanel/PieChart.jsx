import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart=({ Data })=> {
  return (
    <div className="chart-container">
     <Pie style={{width:"25vw"}}
        data={Data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Mela vs Female Provider 2023"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;