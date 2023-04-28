import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import publicApi from '../../api/publicApi'

const Register = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({firstName: '', lastName: '', country: '', phoneNumber: '', email: '', password: '', gender: ''});
  const registerUser = async (e) =>{
    e.preventDefault();

    const from = e.currentTarget;
    if (from.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    try {
      setErrorMsg(null)
      const { data} = await publicApi.post('/signup', formData);
    console.log(data);
    if (data.message === 'Created account successfully!'){
      window.open('/login', '_self');
    }
    } catch (error) {
      setErrorMsg('Something went wrong');
      console.log(error);
    }
    
  }
  return (
    <div>
        <Form noValidate validated={validated} onSubmit={registerUser}>
            <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="first name" onChange={(e) => {setFormData({...formData, firstName: e.target.value})}} required/>
            <Form.Control.Feedback type="invalid">Please choose a firstName</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="last name" onChange={(e) => {setFormData({...formData, lastName: e.target.value})}} required/> 
            <Form.Control.Feedback type="invalid">Please choose a lastName</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>email</Form.Label>
            <Form.Control type="text" placeholder="email" onChange={(e) => {setFormData({...formData, email: e.target.value})}} required/>
            <Form.Control.Feedback type="invalid">Please provide an email</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" onChange={(e) => {setFormData({...formData, password: e.target.value})}} required/>
            <Form.Control.Feedback type="invalid">Please enter your password</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select onChange={(e) => {setFormData({...formData, gender: e.target.value})}} required>
              <option>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please provide your gender</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="country" onChange={(e) => {setFormData({...formData, country: e.target.value})}} required />
            <Form.Control.Feedback type="invalid">Please choose your country</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>phoneNumber</Form.Label>
            <Form.Control type="text" placeholder="phoneNumber" onChange={(e) => {setFormData({...formData, phoneNumber: e.target.value})}} required/>
            <Form.Control.Feedback type="invalid">Please provide your phoneNumber</Form.Control.Feedback>
            </Form.Group>
            {errorMsg? <p style={{color: 'red', fontSize: '0.8em'}}>{errorMsg}</p>: null}
            <Button type="submit">Submit</Button>
    </Form>
    </div>
  )
}

export default Register
