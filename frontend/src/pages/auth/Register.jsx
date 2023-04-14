import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import publicApi from '../../api/publicApi'

const Register = () => {
  const [formData, setFormData] = useState({firstName: '', lastName: '', country: '', phoneNumber: '', email: '', password: '', gender: ''});
  const registerUser = async (e) =>{
    e.preventDefault();
    const { data} = await publicApi.post('/signup', formData);
    console.log(data);
  }
  return (
    <div>
        <Form onSubmit={registerUser}>
            <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="first name" onChange={(e) => {setFormData({...formData, firstName: e.target.value})}}/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="last name" onChange={(e) => {setFormData({...formData, lastName: e.target.value})}}/> 
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>email</Form.Label>
            <Form.Control type="text" placeholder="email" onChange={(e) => {setFormData({...formData, email: e.target.value})}}/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" onChange={(e) => {setFormData({...formData, password: e.target.value})}}/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select onChange={(e) => {setFormData({...formData, gender: e.target.value})}}>
              <option>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="country" onChange={(e) => {setFormData({...formData, country: e.target.value})}} />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>phoneNumber</Form.Label>
            <Form.Control type="text" placeholder="phoneNumber" onChange={(e) => {setFormData({...formData, phoneNumber: e.target.value})}}/>
            </Form.Group>
            <Button type="submit">Submit</Button>
    </Form>
    </div>
  )
}

export default Register
