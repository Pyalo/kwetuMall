import React, { useState, useEffect }  from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import publicApi from '../api/publicApi';
import privateApi from '../api/privateApi';
import Alert from 'react-bootstrap/Alert';

const CheckoutModal = () => {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [locations, setLocations] =useState([]);
  const [locationNames, setLocationNames] = useState([])

  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);

  const getPickupPoints = async () => {
    const { data } = await publicApi.get('/pickuppoint');
    console.log(data);
    let newLocationArr = []; 
    let allPickupPoints = data.data
    for(let i = 0; i<allPickupPoints.length; i++) {
      newLocationArr= [...newLocationArr, allPickupPoints[i].location]
    }
    console.log(new Set(newLocationArr));
    setLocations([...new Set(newLocationArr)]);
    setPickupPoints(data.data); 
  }
  const findLocationNames = (e) =>{
    const locationNames = pickupPoints.filter((pickupPoint) => {
      return pickupPoint.location === e
    })
    console.log(locationNames)
    setLocationNames(locationNames)
  }
  const checkout = async (e) => {
    e.preventDefault();
    const { data } = await privateApi.post('/cart/checkout')
    console.log(data)
  }

  useEffect(() =>{
    getPickupPoints()
  }, [])
  return ( 
       <>
      <Button variant="primary" onClick={handleShow}>
        Proceed to pickup point
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chekout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            showAlert?
            <Alert style={styles.alert} variant="success" dismissible>
            <Alert.Heading>Successfully checked out</Alert.Heading>
            <p>
             Kindly Pick the item within the seven days of odering...Strictly!!!!!.<br/>
             Continue Shopping
             <Alert.Link href="/">here</Alert.Link>
            </p>
          </Alert>
          : null
          }
        <Form onSubmit={checkout}>
      <Form.Group className="mb-3">
        <Form.Label>Pick Checkout location</Form.Label>
        <Form.Select required onChange={(e)=>findLocationNames(e.target.value)}>
          <option></option>
          {
            locations.map((location)=>{
              return(
                <option value={location}>{location}</option>
              )
            })
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Choose pick up point</Form.Label>
        <Form.Select required>
          <option></option>
          {
            locationNames.map((locationName) =>{
              return(
                <option value={locationName.name}>{locationName.name}</option>
              )
            })
          }
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
      Checkout
      </Button>
    </Form>
        </Modal.Body>
      </Modal>
    </>
    
  )
}
const styles={
  alert:{
    background: '#52FFA8',
    color: '#000'
  }
}

export default CheckoutModal
