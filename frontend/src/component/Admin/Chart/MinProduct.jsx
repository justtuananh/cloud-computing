import React from 'react'

const MinProduct = () => {
  return (
    <div style={{width:"100%", height:"500px"}}>
    <h1 style={{textAlign:"center", padding:"1vh"}}>Biểu đồ sản phẩm có số lượng thấp cần chú ý nhập hàng</h1>
  <iframe 
  style={{width:"100%", height:"500px"}}
  src="https://charts.mongodb.com/charts-ercomerce-hpcar/embed/charts?id=6375d9a3-6f51-481e-8608-63f4f999e6ee&maxDataAge=60&theme=light&autoRefresh=true"
  title="Sản phẩm có số lượng thấp nhất cần chú ý nhập hàng"
></iframe>
</div>
  )
}

export default MinProduct