import React from 'react'

const SellInMonth = () => {
  return (
    <div style={{width:"100%", height:"500px"}}>
    <h1 style={{textAlign:"center", padding:"1vh"}}>Biểu đồ thu nhập từng ngày trong tháng</h1>
  <iframe 
  style={{width:"100%", height:"500px"}}
  src="https://charts.mongodb.com/charts-ercomerce-hpcar/embed/charts?id=63a7c58f-17c1-47e1-8470-250151c2b0b2&maxDataAge=60&theme=light&autoRefresh=true"
  title="Sản phẩm có số lượng thấp nhất cần chú ý nhập hàng"
></iframe>
</div>
  )
}

export default SellInMonth