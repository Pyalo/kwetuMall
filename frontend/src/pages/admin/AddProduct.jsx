import React, { useState, useEffect} from 'react';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import publicApi from '../../api/publicApi';
import SideNav from './sideNav';


const AddProduct = () => {
    const [categories, setCategories] = useState ([])
    const [productData, setProductData] = useState({
        name: '', image: '', images: [], price: '', currency: '', quantity: '', category: [], discountPercentage: '', description: ''
    })

    const getCategories = async () => {
        const { data } = await publicApi.get('/category/get')
        console.log(data)
        setCategories(data)
    }
    const saveFiles = (e) =>{
      let imgArr = [];
      let images = e.target.files;
      for (let i=0; i<images.length; i++){
        imgArr = [...imgArr, images[i]]
      }
      setProductData({...productData, images: imgArr});
    }
    const addProducts = async (e) => {
      try {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', productData.name);
        // appending images
        formData.append('image', productData.image);
        productData.images.forEach((img)=> {
          formData.append('images', img);
        })
        formData.append('price', productData.price);
        formData.append('quantity', productData.quantity);
        formData.append('category', productData.category);
        formData.append('discountPercentage', productData.discountPercentage);
        formData.append('description', productData.description);
    
        const { data } = await publicApi.post('/products/create', formData)
        console.log(data);
        
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() =>{
        getCategories()
    }, []);
  return (
    <div>
      <SideNav/>
    <Container style={styles.Cont}>
      <h3 style={styles.AdCat}>Add Product</h3>
      <Form onSubmit={addProducts}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder='name' required value={productData.name} onChange={(e) =>setProductData ({...productData, name: e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label >Description</Form.Label>
        <Form.Control type="textarea" placeholder='description' required value={productData.description} onChange={(e) =>setProductData ({...productData, description: e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label >Quantity</Form.Label>
        <Form.Control type="number" placeholder='quantity' required value={productData.quantity} onChange={(e) =>setProductData ({...productData, quantity: e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label >Price</Form.Label>
        <Form.Control type="number" placeholder='price' required value={productData.price} onChange={(e) =>setProductData ({...productData, price: e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label >Main image</Form.Label>
        <Form.Control type="file" placeholder='mainImage' onChange={(e)=> setProductData
           ({...productData, image: e.target.files[0]})}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label >Images</Form.Label>
        <Form.Control type="file" placeholder='images' multiple onChange={saveFiles}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label >Category</Form.Label>
        <p>
            {productData.category.map((item)=> item+' ')}
        </p>
            {/* {Change it to a delete icon} */}
            {
                productData.category.length> 0?
            < p onClick={() => setProductData({...productData, category: []})}>X</p>
            : null
            }
        <Form.Select onChange={(e)=> setProductData({...productData, category: [...productData.category, e.target.value]})}>
            <option></option>
            {
                categories.map((category)=> {
                    return(
                        <option key = {category._id} value={category.name}>{category.name}</option>
                    )
                })
            }
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label >Discount Percentage</Form.Label>
        <Form.Control type="number" placeholder='dicsountPercentage' required value={productData.discountPercentage} onChange={(e) =>setProductData ({...productData, discountPercentage: e.target.value})}/>
      </Form.Group>
      <button style={styles.btn}>Submit</button>
      </Form>
    </Container>
    </div>
  )
}
const styles={
    btn:{
       background: 'black',
       width: '100%'
    },
    Cont:{
       background: '#FC4F00',
       marginLeft: '200px' ,
       width: 'calc(100vw - 230px)'
    },
    AdCat:{
      color: 'grey',
      textAlign: 'center'
    }
}
export default AddProduct
