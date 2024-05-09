import React from 'react';
import { Link } from "react-router-dom";

const UserBuyMost = () => {
  return (
    <div style={{width:"100%", height:"500px"}}>
    <h1 style={{textAlign:"center", padding:"1vh"}}>Biểu đồ người dùng mua hàng nhiều nhất từng tháng </h1>
    <Link to="/admin/users"> <a>Xem thêm</a></Link>
  <iframe 
  style={{width:"100%", height:"500px"}}
  src="https://charts.mongodb.com/charts-ercomerce-hpcar/embed/charts?id=63a7d02c-6009-4e25-859c-228b154a9402&maxDataAge=60&theme=light&autoRefresh=true"
  title="YouTube video"
></iframe>
</div>
  )
}

export default UserBuyMost