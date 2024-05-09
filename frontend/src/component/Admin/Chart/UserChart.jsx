import React from 'react'

const UserChart = () => {
  return (
    <div style={{width:"450px", height:"500px"}}>
    <h1 style={{textAlign:"center", padding:"1vh"}}>Biểu đồ người dùng</h1>
  <iframe 
  style={{width:"400px", height:"500px"}}
  src="https://charts.mongodb.com/charts-ercomerce-hpcar/embed/charts?id=636b6840-bdee-405e-8e4f-c4a037fe5a88&maxDataAge=60&theme=light&autoRefresh=true"
  title="YouTube video"
></iframe>
</div>
  )
}

export default UserChart