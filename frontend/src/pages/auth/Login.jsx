import React, { useState } from 'react'
import Cookies from 'js-cookie'
import Button from 'react-bootstrap/Button'
import Form  from 'react-bootstrap/Form'
import publicApi from '../../api/publicApi'

const Login = () => {
    const [ errorMsg, setErrorMsg] = useState(null);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] =useState ({email: '', password: ''});
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            setErrorMsg(null)
            const { data } = await publicApi.post('/signin', formData);
            console.log(data);
            if(data.message === 'User authenticated'){
                console.log('success');
                Cookies.set('token', data.token)
                window.open('/', '_self');
            }
            setValidated(true);
        } catch (error) {
            setErrorMsg('Something went wrong');
            console.log(error);
        }
    }
    return(
        <div>
            <h1>Hey User!!</h1>
            <Form noValidate validated={validated} onSubmit={loginUser}>
            <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" placeholder="email" onChange={(e) => {setFormData({...formData, email: e.target.value})}} required/>
            <Form.Control.Feedback type="invalid">Please provide an email</Form.Control.Feedback>
            <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" onChange={(e) => {setFormData({...formData, password: e.target.value})}} required/>
            <Form.Control.Feedback type="invalid">Please give a password</Form.Control.Feedback>
            </Form.Group>
            <p>Forgot Password?</p>
            {errorMsg? <p style={{color: 'red', fontSize: '0.8em'}}>{errorMsg}</p>: null}
            <Button type="submit">Login</Button>
    </Form>
        </div>
    )
}
export default Login