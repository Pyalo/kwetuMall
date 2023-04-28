import React, {useState, useEffect} from 'react';
import publicApi from '../api/publicApi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import '../App.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'; 
import Button  from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [products, setProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
    const getProducts = async () => {
        const { data } = await publicApi.get('/products')
        console.log(data)
        setProducts(data.data)
    }
    useEffect(()=>{
        getProducts()
    },[])
    const navigate= useNavigate()
    return(
        <div>
           <Container>
            <ShoppingCartIcon/>
                <p className="white">Kwetumall</p>
                    <div style={styles.pic}>
                        <img className="d-block w-100" src='Rectangle 52.png' alt="home picture" style={styles.img} />
                        <Carousel.Caption>
                                <div style={styles.carr}>
                                    <h5>Items on Sale <ArrowRightAltIcon/> </h5>
                                </div>
                            </Carousel.Caption>
                    </div>
                    <Row xs={3} md={4} className="g-4">  
                        {
                            products.map((product) =>(
                                <Col key={product._id}>
                                    <Card className="mb-3" style={styles.card}>
                                        <Card.Img variant="top" src={backendUrl + product.mainImage} style={styles.cadimg}/>
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>{product.description}</Card.Text>
                                            <div style={styles.price}>
                                                <Card.Text style={styles.pesa}>Kshs.{product.price}</Card.Text>
                                                <Button onClick={()=> navigate(`/productdetails/${product._id}`)} style={styles.bats} className="button buttons">View</Button>
                                            </div>  
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))   
                        } 
                    </Row>
            </Container>
        </div> 
    )
}
const styles= {
    always: {
        display: 'flex',
        justifyContent: 'center',
        color: 'rgb(200, 150, 100)',
        letterSpacing: '5px'
  },
  inp: {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px 20px 20px 0px'
  },
  boder: {
      width: '95%',
      borderRadius: '10px',
      borderColor: 'rgb(0, 0, 0)',
      height: '30px'
  },
  icon: {
      marginLeft: '-40px',
      paddingTop: '5px'
  },
  pic: {
      borderRadius: '20px',
      paddingBottom: '50px'
  },
  img: {
     width: '100%',
     borderRadius: '5px'
  },
  carr: {
    marginBottom: '180px',
    background: 'black',
    // backgroundSize: '30px 40px'
  },
  line: {
      justifyContent: 'space-between',
      margin: '10px'
  },
  box: {
      width: '50px',
  },
  price: {
        display: 'flex',
        justifyContent: 'space-between'
 },

 pesa:{
    fontWeight: 'bold'
 },
 card:{
    border: '0px solid white'
 },
  bats:{
    borderRadius: '50px 50px 50px 50px',
    height: '30px',
    width: '130px',
    marginBottom: '50px'
 },
 
 
}
export default Home

