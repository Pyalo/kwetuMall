import React, { useEffect, useState } from 'react'
import privateApi from '../api/privateApi.js';
import CheckoutModal from '../components/CheckoutModal.jsx';
 

const CartDetails = () => {
const [cart, setCart] =useState([]);
const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

  const getCart = async () =>{
    const {data} = await privateApi.get('/cart/getitems')
    console.log(data)
    setCart(data.data)
  }
  const getTotalAmount = () => {
    let sum = 0;
    for (let i = 0; i< cart.length; i++){
      let cartItemSum = cart[i].product.price *(cart[i].cartQuantity? cart[i].cartQuantity: 1);
      sum= cartItemSum + sum;
    }
    return(sum);
  }
  const removeFromCart = async (productId) =>{
    const { data } = await privateApi.get(`/cart/remove/${productId}`);
    console.log(data); 
    if(data.message === 'Remove from cart successfully!!'){
      getCart();
    } 
  }
  useEffect(()=>{
    getCart ();
  }, []); 
  return (
    <div> 
      {
        cart.map((cartItem) => {
          return(
            <div key={cartItem.product._id} style={{...styles.flow, ...styles.cont}} className='mb-3'>
              <img alt={cartItem.product.name} src={backendUrl + cartItem.product.mainImage}/>
              <p>{cartItem.product.name}</p>
              <p>Ksh {cartItem.product.price}</p>
              <p>{cartItem.cartQuantity ? cartItem.cartQuantity: 1}</p>
              <p onClick={() => removeFromCart(cartItem.product._id)}>X</p>
            </div>
          )
        })
      }
      <p>Total: Ksh {getTotalAmount()}</p>
      <CheckoutModal/>
    </div>
  )
}
const styles={
  flex:{
      display: 'flex'
    },
    cont:{
      justify: 'space-between',
      alignItems: 'center'
    }
  }

export default CartDetails


