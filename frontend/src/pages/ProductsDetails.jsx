import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import publicApi from '../api/publicApi.js'
import privateApi from '../api/privateApi.js'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
 


const ProductDetails = () =>{
    const{ id } = useParams()
    const [product, setProduct] = useState({})
    const [counter, setCounter] = useState (1)
    const [errMsg, setErrMsg] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL
    console.log(id)
    const getProduct = async () => {
        const { data } = await publicApi.get(`/products/${id}`, {quantity: counter})
        console.log(data)
        setProduct(data.data)
    }
const subtractCounter = () => setCounter(counter-1)
const addCounter = () => setCounter(counter+1)
const addToCart = async () => {
    if(counter < 1){
        setErrMsg('Add at least one item')
    }else{
        try {
            const { data } = await privateApi.post(`/cart/addtocart/${id}`)
            console.log(data)
            setSuccessMsg(data.message)
        } catch (error) {
            setErrMsg(error.message)
        }
    }
}
    useEffect(()=>{
        getProduct()
    },[])
    if(!product.images){
        return(
            <p>Loading...</p>
        )
    }
    return(     
        <div style={styles.upmost}>
            <div>
                <div>
                <p style={styles.base}>
                    Kwetumall
                    <AccountCircleIcon /> 
                    <ShoppingCartIcon />
                </p>
                <hr style={styles.hrline}></hr >
                </div>
                <img src={backendUrl + product.mainImage} alt={product.name} style={styles.cont}/>
                <div>
                    {
                        product.images.map((img)=>{
                            return(
                                <img src={backendUrl + img} alt='product' style={styles.maging}/>
                            )
                        })
                    }; 
                </div>
            </div>
            <div style={styles.move}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p></p>
                <div style={styles.horizontal}>
                    <button onClick={subtractCounter}>-</button>
                    <p>{counter}</p>
                    <button onClick={addCounter}>+</button>
                </div>
                <button onClick={addToCart}>Add to Cart</button>
                {errMsg?<p>{errMsg}</p>:null}
                {successMsg?<>
                <p>{successMsg}</p>
                <a href='/cartdetails'>View Cart</a>
                </>:null}
            </div> 
        </div>
    )
} 
const styles= {
    upmost: {
        display: 'flex',
        justifyContent: 'center',
        
    },
    horizontal: {
        display: 'flex',
        margin: '20px',
        
    },
    maging: {
        width: '50px',
        height: '50px',
        margin: '10px'
    },
    move:{
        paddingTop: '50px',
        // position: 'absolute',
        // left: '10px'
    },
    hrline:{
        width: '500px'
    },
    base:{
        paddingTop: '10px',
        marginBottom: '0px'
    }
}
export default ProductDetails