import React from 'react'
import { useSelector } from "react-redux";
import { Rating } from "@material-ui/lab";
import Loading from "../../more/Loader"

const ReviewCard = ({review}) => {
    // eslint-disable-next-line

const { product,loading } = useSelector(
    (state) => state.productDetails
  );

    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
        color:"#b73b3b"
      };

    return (
       <div style={{
        alignItems:"center",
        justifyContent:"center",
        padding:"10px",
        marginLeft:"5vmax",
       }}>
       {loading ? (
           <Loading />
       ) :(
        <div style={{ border:"2px solid",
        borderColor:"#888888", marginBottom:"10px",borderRadius:"12px",width:"90%",backgroundColor:"#cdcdcc44"}}> 
        <div style={{
            display:"flex",
            alignItems:"center",
            padding:"0px 30px",
            width:"100%",
           
        }}>
           <img
                src={review.avatar.url ? review.avatar.url : ("/profile.png")}
                alt={review.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                  objectFit: "cover",
                  marginRight: "10px",
                  marginTop:"10px",
                }}
              />
            <p style={{fontSize:"1.2vmax",fontWeight:"900",paddingBottom:"5px",marginTop:"5px"}}>{review.name}</p>
            <p style={{paddingLeft:"14px",color:"#5e5e5edf",paddingBottom:"5px",marginTop:"5px"}}>({String(review.time).substr(0,10)})</p>
        </div>
          <div style={{display:"list-item",
            alignItems:"center",
            padding:"10px 18px",}}>
                <Rating style={{marginLeft:"2.5vmax"}}{...options} />
              <p style={{lineHeight:"1.3",fontSize:"1.2vmax",marginLeft:"2.5vmax"}}>{review.comment}</p>
              
          </div>
        </div>
       )}
       </div>
    )
}

export default ReviewCard
