import React from 'react';
import { Link } from 'react-router-dom';
import "./CartItemCard.css";
import currency from "currency-formatter";

const CartItemCard = ({item, deleteCartItems}) => {
    return (
        <div className='CartItemCard'>
          
            <img src={item.image} alt="ssa" />
            <div> 
                <Link to={`/product/${item.product}`} style={{ marginLeft:"20px", fontSize:"large"}}>{item.name}</Link>
                <span style={{marginTop:"10px", marginLeft:"20px"}}>{`Giá: ${currency.format(item.price, {code:"VND"})}`}</span>    
                <span style={{marginTop:"5px", marginLeft:"20px"}}>{`${item.size ? `Size: ${item.size}`:" "}`}</span>    
                <span style={{marginTop:"5px", marginLeft:"20px"}}>{`${item.color ? `Màu: ${item.color}`:" "}`}</span>  
          
            </div>
            <div style={{alignItems:"end",justifyContent:"end",flex:"1",marginRight:"8%",float:"right",margin:"auto"}}>
            <p className='button_remove' onClick={() => deleteCartItems(item.product)}>Xóa</p>
            </div>
        </div>
    )  
}

export default CartItemCard
