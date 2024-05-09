import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    SAVE_NOTE_BUY,
  
  } from "../constans/CartConstans";
  import axios from "axios";
  
  // Add to Cart ---Product
  export const addItemsToCart = (id, quantity,color,size) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v2/product/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
        color,
        size,
       
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  // REMOVE FROM CART ---Product
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };


  // SAVE SHIPPING INFO 
  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };

    // SAVE NOTE_BUY
    export const saveNoteBuy = (data) => async (dispatch) => {
      dispatch({
        type: SAVE_NOTE_BUY,
        payload: data,
      });
    
      localStorage.setItem("noteBuy", JSON.stringify(data));
    };
  