import React from "react";


const ProductChart = () => {
  return (
    <div style={{width:"450px", height:"500px"}}>
      <h1 style={{textAlign:"center", padding:"1vh"}}>Biểu đồ sản phẩm</h1>
    <iframe 
    style={{width:"400px", height:"500px"}}
    src="https://charts.mongodb.com/charts-ercomerce-hpcar/embed/charts?id=636b6954-2e11-4f90-8ada-62bc3141de98&maxDataAge=60&theme=light&autoRefresh=true"
    title="YouTube video"
  ></iframe>
  </div>
  );
};

export default ProductChart;
